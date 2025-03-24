from quopri import decodestring
import os
import torch
import torchvision
import matplotlib.pyplot as plt

EPOCH = 1
BATCH_SIZE = 50
LR = 0.001
DOWNLOAD_CIFAR = False

classes = ('plane', 'car', 'bird', 'cat',
           'deer', 'dog', 'frog', 'horse', 'ship', 'truck')

train_data = torchvision.datasets.CIFAR10(
    root='./test/',  # 保存或者提取位置
    train=False,  # this is training data # True For Training, False for Testing
    transform=torchvision.transforms.ToTensor(),  # 转换 PIL.Image or numpy.ndarray 成
    # torch.FloatTensor (C x H x W), 训练的时候 normalize 成 [0.0, 1.0] 区间
    download=True,  # 没下载就下载, 下载了就不用再下了
)
for item in classes:
    dirpath = './test/' + item
    if not os.path.exists(dirpath):
        os.mkdir(dirpath)

plt.show()
counter = 0
for images, labels in train_data:
    images = images.numpy().transpose(1, 2, 0)  # 把channel那一维放到最后
    name=str(classes[labels])
    plt.imsave('./test/'+name+'/'+name+'_'+str(counter)+str(labels)+'.jpg', images)
    plt.title(str(classes[labels]))
    plt.imshow(images)
    counter=counter+1
    print("loading"+str(counter))
    
