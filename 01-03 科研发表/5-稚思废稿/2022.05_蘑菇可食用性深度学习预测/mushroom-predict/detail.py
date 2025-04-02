import keras
import numpy
import sklearn
import pyspark
import tensorflow
import pandas as pd
import matplotlib.pyplot as plt

# Q1 data choice
# Census-Income Database
# https://archive.ics.uci.edu/ml/datasets/Census-Income+%28KDD%29

data = pd.read_csv('./agaricus-lepiota.data',sep=',')
data.columns = ['classes','cap-shape','cap-surface','cap-color','bruises?','odor','gill-attract','gill-spacing','gill-size','gill-color','stalk-shape','stalk-root','stalk-surface-above-ring','stalk-surface-below-ring','stalk-color-above-ring','stalk-color-below-ring','veil-type','veil-color','ring-number','ring-type','spore-print-color','population','habitat']
print(data.head)
print(data.shape)
print(data.columns)
print(data.describe())

# Q2 data description

# From Audobon Society Field Guide; mushrooms described in terms of physical characteristics; classification: poisonous or edible. extracted from the 1994 and 1995 Current Census Surveys conducted by the U.S. Census Bureau. The data contains 41 demographic and employment-related variables.
 
# Mushroom records taken from the Audubon Society Field Guide to North American Mushrooms

# The dataset includes descriptions of hypothetical samples corresponding to 23 species of spiny mushrooms in the Agaricus and Lepiota families

# Q3 initial analysis.

#  how many instances does the dataset contain
print("The dataset contains",len(data),"instances")

# how many attributes there are in the dataset
print("The dataset contains",len(data.columns),"attributes")

# decide if there is missing value
print("There are",data.isnull().sum().sum(),"missing values")

#  how many attributes there are in the dataset, their names, and include which is the class attribute.
for col in data.columns:
    print("The [",col,"]is",data[col].dtype)
    print("The dataset contains",data[col].value_counts(),"instances in each class")
    print("-----------------------------------------------------------------------------------")
    
# preprocess the data
processed_data = data.drop(['classes'],axis=1)


# Q4 groupby analysis
# conducting groupby analysis
print("the cap-shape has "+str(processed_data['cap-shape'].nunique())+" unique values")

# list the unique value
print(processed_data['cap-shape'].unique())

# a list of the unique values
cap_shape_x=(processed_data['cap-shape']=='x')
cap_shape_b=(processed_data['cap-shape']=='b')
cap_shape_s=(processed_data['cap-shape']=='s')
cap_shape_f=(processed_data['cap-shape']=='f')
cap_shape_k=(processed_data['cap-shape']=='k')
cap_shape_c=(processed_data['cap-shape']=='c')

print("the cap-shape has "+str(cap_shape_x.sum())+" x")
print("the cap-shape has "+str(cap_shape_b.sum())+" b")
print("the cap-shape has "+str(cap_shape_s.sum())+" s")
print("the cap-shape has "+str(cap_shape_f.sum())+" f")
print("the cap-shape has "+str(cap_shape_k.sum())+" k")
print("the cap-shape has "+str(cap_shape_c.sum())+" c")

# groupby analysis
cap_shape_data=processed_data.groupby('cap-shape')
cap_shape_data.get_group('x')
cap_shape_data.get_group('x').shape

print(type(cap_shape_data))
print(type(cap_shape_data.get_group('x')))
print(len(cap_shape_data))
print(len(cap_shape_data.get_group('x')))

# Q5 data representation
processed_data['cap-shape'].value_counts().plot(kind='bar')
processed_data['cap-shape'].value_counts().plot(kind='barh')
processed_data['cap-shape'].value_counts().plot(kind='pie')
processed_data['cap-shape'].value_counts().plot(kind='hist',bins=40)

# Q7 Data mining
# split the data
from sklearn.model_selection import train_test_split
train_lr, test_lr = train_test_split(data, test_size=0.33)

# feature and target
data_features = ['cap-shape','cap-surface','cap-color','bruises?','odor','gill-attract','gill-spacing','gill-size','gill-color','stalk-shape','stalk-root','stalk-surface-above-ring','stalk-surface-below-ring','stalk-color-above-ring','stalk-color-below-ring','veil-type','veil-color','ring-number','ring-type','spore-print-color','population','habitat']
data_target = ['classes']

# ID3 algorithm
from sklearn.feature_extraction import DictVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

vec=DictVectorizer(sparse=False)
X_train=vec.fit_transform(train_lr[data_features].to_dict(orient='records'))
y_train=train_lr[data_target].values
X_test=vec.transform(test_lr[data_features].to_dict(orient='records'))
y_test=test_lr[data_target].values


dtc_model = DecisionTreeClassifier()
dtc_model.fit(X_train,y_train)
y_pred = dtc_model.predict(X_test)
print("the accuracy of the model is: "+str(accuracy_score(y_test,y_pred)))

# cart algorithm
rf_model = RandomForestClassifier(n_estimators=100)
rf_model.fit(X_train,y_train)
y_pred = rf_model.predict(X_test)
print("the accuracy of the model is: "+str(accuracy_score(y_test,y_pred)))