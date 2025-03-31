import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
from torch.utils.data import Dataset, DataLoader
import time
import matplotlib.pyplot as plt
import random
from msmarco_sample import msmarco_samples, MSMARCODataset

# SimpleDataset已被MSMARCODataset替代

class Encoder(nn.Module):
    def __init__(self, input_dim=128, hidden_dim=256, output_dim=128):
        super().__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, output_dim)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return F.normalize(x, p=2, dim=1)

class InfoNCELoss(nn.Module):
    def __init__(self, temperature=0.07):
        super().__init__()
        self.temperature = temperature

    def forward(self, features):
        batch_size = features.shape[0]
        labels = torch.arange(batch_size, device=features.device)
        
        # 计算相似度矩阵
        similarity_matrix = torch.matmul(features, features.T)
        similarity_matrix = similarity_matrix / self.temperature
        
        loss = F.cross_entropy(similarity_matrix, labels)
        return loss

class TripletLoss(nn.Module):
    def __init__(self, margin=0.2):
        super().__init__()
        self.margin = margin

    def forward(self, features):
        batch_size = features.shape[0]
        # 随机选择正负样本
        anchor = features
        positive_idx = torch.randperm(batch_size)
        negative_idx = torch.randperm(batch_size)
        positive = features[positive_idx]
        negative = features[negative_idx]

        positive_dist = torch.norm(anchor - positive, dim=1)
        negative_dist = torch.norm(anchor - negative, dim=1)

        losses = F.relu(positive_dist - negative_dist + self.margin)
        return losses.mean()

def train_model(model, loss_fn, train_loader, optimizer, device, epochs=10):
    model.train()
    train_times = []
    train_losses = []
    
    for epoch in range(epochs):
        epoch_loss = 0
        start_time = time.time()
        
        for batch in train_loader:
            batch = batch.to(device)
            optimizer.zero_grad()
            
            query, positive, negative = batch
            query = query.to(device)
            positive = positive.to(device)
            negative = negative.to(device)
            
            # 编码查询和文档
            query_features = model(query)
            positive_features = model(positive)
            negative_features = model(negative)
            
            # 将所有特征拼接在一起用于损失计算
            features = torch.cat([query_features, positive_features, negative_features], dim=0)
            
            loss.backward()
            optimizer.step()
            
            epoch_loss += loss.item()
        
        epoch_time = time.time() - start_time
        train_times.append(epoch_time)
        train_losses.append(epoch_loss / len(train_loader))
        
        print(f'Epoch {epoch+1}, Loss: {epoch_loss/len(train_loader):.4f}, Time: {epoch_time:.2f}s')
    
    return train_times, train_losses

# 主函数
def main():
    # 设置参数
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    batch_size = 128
    feature_dim = 128
    num_samples = 1000
    epochs = 10
    
    # 创建MSMARCO数据集和数据加载器
    dataset = MSMARCODataset(msmarco_samples, feature_dim=feature_dim)
    train_loader = DataLoader(dataset, batch_size=batch_size, shuffle=True)
    
    # 训练InfoNCE模型
    infonce_model = Encoder(input_dim=feature_dim).to(device)
    infonce_loss = InfoNCELoss()
    infonce_optimizer = torch.optim.Adam(infonce_model.parameters(), lr=0.001)
    
    print('Training with InfoNCE loss...')
    infonce_times, infonce_losses = train_model(
        infonce_model, infonce_loss, train_loader, infonce_optimizer, device, epochs
    )
    
    # 训练Triplet Loss模型
    triplet_model = Encoder(input_dim=feature_dim).to(device)
    triplet_loss = TripletLoss()
    triplet_optimizer = torch.optim.Adam(triplet_model.parameters(), lr=0.001)
    
    print('\nTraining with Triplet loss...')
    triplet_times, triplet_losses = train_model(
        triplet_model, triplet_loss, train_loader, triplet_optimizer, device, epochs
    )
    
    # 绘制结果
    plt.figure(figsize=(12, 4))
    
    # 绘制损失曲线
    plt.subplot(1, 2, 1)
    plt.plot(infonce_losses, label='InfoNCE')
    plt.plot(triplet_losses, label='Triplet')
    plt.title('Training Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    
    # 绘制时间柱状图
    plt.subplot(1, 2, 2)
    x = np.arange(2)
    avg_times = [np.mean(infonce_times), np.mean(triplet_times)]
    plt.bar(x, avg_times)
    plt.xticks(x, ['InfoNCE', 'Triplet'])
    plt.title('Average Training Time per Epoch')
    plt.ylabel('Time (s)')
    
    plt.tight_layout()
    plt.savefig('loss_comparison.png')
    plt.close()

if __name__ == '__main__':
    main()