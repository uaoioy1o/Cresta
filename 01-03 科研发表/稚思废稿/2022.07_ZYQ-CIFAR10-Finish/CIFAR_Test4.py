from cgi import test
import os
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms
import argparse
from resnet import ResNet18

# 创建 model 文件夹
if not os.path.exists(r'./model'):
    os.mkdir(r'./model')

# 定义是否使用GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
# 参数设置,使得我们能够手动输入命令行参数，就是让风格变得和Linux命令行差不多
parser = argparse.ArgumentParser(description='PyTorch CIFAR10 Training')
parser.add_argument('--outf', default='./model/', help='folder to output images and model checkpoints') #输出结果保存路径
parser.add_argument('--net', default='./model/Resnet18.pth', help="path to net (to continue training)")  #恢复训练时的模型路径
args = parser.parse_args()
 
# 超参数设置
EPOCH = 135   #遍历数据集次数
pre_epoch = 0  # 定义已经遍历数据集的次数
BATCH_SIZE = 128      #批处理尺寸(batch_size)
LR = 0.14        # 学习率
 
# 准备数据集并预处理
transform_train = transforms.Compose([
    transforms.RandomCrop(32, padding=4),  #先四周填充0，在吧图像随机裁剪成32*32
    transforms.RandomHorizontalFlip(),  #图像一半的概率翻转，一半的概率不翻转
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465), (0.2023, 0.1994, 0.2010)), #R,G,B每层的归一化用到的均值和方差
])
 
transform_test = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465), (0.2023, 0.1994, 0.2010)),
])

curr_dir=os.getcwd()
curr_dir1=curr_dir+r'\data'
curr_dir2=curr_dir+r'\test'
curr_dir3=curr_dir+r'\test2'

#trainset = torchvision.datasets.CIFAR10(root='./data', train=True, download=False, transform=transform_train) #训练数据集
trainset=torchvision.datasets.ImageFolder(curr_dir1,transform=transform_train)
trainloader = torch.utils.data.DataLoader(trainset, batch_size=BATCH_SIZE, shuffle=True, num_workers=2)   #生成一个个batch进行批训练，组成batch的时候顺序打乱取

#testset = torchvision.datasets.CIFAR10(root='./data', train=False, download=False, transform=transform_test)
# test1 准确率 test2 提取率
testset=torchvision.datasets.ImageFolder(curr_dir2,transform=transform_test)
testloader = torch.utils.data.DataLoader(testset, batch_size=BATCH_SIZE, shuffle=True, num_workers=2)

# Cifar-10的标签
classes = ('plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck')
 
# 模型定义-ResNet
net = ResNet18().to(device)
 
# 定义损失函数和优化方式
criterion = nn.CrossEntropyLoss()  #损失函数为交叉熵，多用于多分类问题
optimizer = optim.SGD(net.parameters(), lr=LR, momentum=0.9, weight_decay=5e-4) #优化方式为mini-batch momentum-SGD，并采用L2正则化（权重衰减）

# 训练
if __name__ == "__main__":
    best_acc = 85  #2 初始化best test accuracy
    print("Start Training, Resnet-18!")  # 定义遍历数据集的次数
    with open("acc.txt", "w") as f:
        with open("log.txt", "w")as f2:
            for epoch in range(pre_epoch, EPOCH):
                print('\nEpoch: %d' % (epoch + 1))
                net.train()   #训练模型时使用该语句，根据情况对Dropout和BatchNormalization进行参数调整
                sum_loss = 0.0
                correct = 0.0
                total = 0.0
                for i, data in enumerate(trainloader, 0):
                    # 准备数据
                    length = len(trainloader)   #获取训练数据总长度
                    inputs, labels = data
                    inputs, labels = inputs.to(device), labels.to(device)
                    optimizer.zero_grad()
 
                    # forward + backward
                    outputs = net(inputs)
                    loss = criterion(outputs, labels)
                    loss.backward()
                    optimizer.step()
 
                    # 每训练1个batch打印一次loss和准确率
                    sum_loss += loss.item()    #损失加和（越来越小）
                    _, predicted = torch.max(outputs.data, 1)   #输出这一批次128的对应分类
                    total += labels.size(0)
                    correct += predicted.eq(labels.data).cpu().sum()   #判断这一批次的正确个数，并进行加和
                    print('[epoch:%d, iter:%d] Loss: %.03f | Acc: %.3f%% '
                          % (epoch + 1, (i + 1 + epoch * length), sum_loss / (i + 1), 100. * correct / total))
                    f2.write('%03d  %05d |Loss: %.03f | Acc: %.3f%% '
                          % (epoch + 1, (i + 1 + epoch * length), sum_loss / (i + 1), 100. * correct / total))
                    f2.write('\n')
                    f2.flush()
 
                # 每训练完一个epoch测试一下准确率
                print("Waiting Test!")
                with torch.no_grad():   #里边的数据不需要计算梯度，不需要进行反向传播
                    correct = 0
                    total = 0

                    for data in testloader:
                        net.eval()   #测试模型时使用该语句，因为模型已经训练完毕，参数不会再更改，所以直接计算训练时所有batch的均值和方差
                        images, labels = data
                        images, labels = images.to(device), labels.to(device)
                        outputs = net(images)
                        # 取得分最高的那个类 (outputs.data的索引号)
                        _, predicted = torch.max(outputs.data, 1)    # 取得分最高的那个类 (outputs.data的索引号)
                        total += labels.size(0)
                        correct += (predicted == labels).sum()
                    
                    print('测试分类准确率为：%.3f%%' % (100 * correct / total))
                    acc = 100. * correct / total

                    # 这里是触发集
                    # correct2 = 0
                    # total2 = 0
                    # for data in testloader2:
                    #     net.eval()   #测试模型时使用该语句，因为模型已经训练完毕，参数不会再更改，所以直接计算训练时所有batch的均值和方差
                    #     images, labels = data
                    #     images, labels = images.to(device), labels.to(device)
                    #     outputs = net(images)
                    #     # 取得分最高的那个类 (outputs.data的索引号)
                    #     _, predicted = torch.max(outputs.data, 1)    # 取得分最高的那个类 (outputs.data的索引号)
                    #     total2 += labels.size(0)
                    #     correct2 += (predicted == labels).sum()
                    # print('测试分类提取率为：%.3f%%' % (100 * correct2 / total2))
                    # acc2 = 100. * correct2 / total2

                    # 将每次测试结果实时写入acc.txt文件中
                    print('Saving model......')
                    torch.save(net.state_dict(), '%s/net_%03d.pth' % (args.outf, epoch + 1))
                    f.write("EPOCH=%03d,Accuracy= %.3f%%" % (epoch + 1, acc))
                    f.write('\n')
                    f.flush()
                    # 记录最佳测试分类准确率并写入best_acc.txt文件中
                    if acc > best_acc:
                        f3 = open("best_acc.txt", "w")
                        f3.write("EPOCH=%d,best_acc= %.3f%%" % (epoch + 1, acc))
                        f3.close()
                        best_acc = acc
            print("Training Finished, TotalEPOCH=%d" % EPOCH)

'''
# 参考资料：
https://blog.csdn.net/sunqiande88/article/details/80100891
https://blog.csdn.net/weixin_43793397/article/details/121960443

# 加载模型
https://www.freesion.com/article/9108414663/
https://blog.csdn.net/sunqiande88/article/details/80100891
https://blog.csdn.net/water19111213/article/details/106298910

已测试
vm40
trigger 50 epoch 19 lr=0.10 acc=66
trigger 30 epoch 30 lr=0.17 acc=64
trigger 20 epoch 16 lr=0.12 acc=56

wm50
trigger 50 epoch 48 lr=0.14 acc=76
'''
