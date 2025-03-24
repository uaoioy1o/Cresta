# -*- coding:utf-8 -*-
#使用PIL库
from PIL import Image


#文件路径，默认在当前文件夹下，更换名字即可
InputImage = r'tmp.png'
#定义输出画面的宽度
ImageWidth = 90
#定义输出画面高度
ImageHeight = 50
Ascii_Char = list(r"$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'. ")  #所用字符列表


# 将256灰度映射到70个字符上
def CharReflection(r, g, b, alpha=256):
	# 设置alpha透明度
    if alpha == 0:
        return ' '
    length = len(Ascii_Char)
    # 计算灰度
    gray = int(0.2126 * r + 0.7152 * g + 0.0722 * b)
    unit = (256.0 + 1) / length
    # 不同的灰度对应着不同的字符
    return Ascii_Char[int(gray / unit)]


# 通过灰度来区分色块
def main():
	#图文转换
    Temp = Image.open(InputImage)
    Temp = Temp.resize((ImageWidth, ImageHeight), Image.NEAREST)
    Text = ""
    for i in range(ImageHeight):
        for j in range(ImageWidth):
            Text += CharReflection(*Temp.getpixel((j, i)))
        Text += '\n'\
    #输出图像
    print(Text)
    with open("output.txt", 'w') as f:
        f.write(Text)


if __name__ == '__main__':
	main()
