
# ============================================================
# LeNet-5를 활용한 MNIST 손글씨 숫자 인식
# - MNIST 데이터셋 불러오기
# - CNN(합성곱 신경망) 모델 생성
# - 손글씨 숫자 0~9 학습
# - 테스트 데이터로 정확도 평가
# ============================================================

import numpy as np
import tensorflow as tf
import tensorflow.keras.datasets as ds

# 신경망 모델 및 계층
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import (
    Input, Conv2D, MaxPooling2D, Flatten, Dense
)

# 최적화 알고리즘
from tensorflow.keras.optimizers import Adam


# ============================================================
# 1. MNIST 데이터셋 불러오기
# ============================================================

# x_train : 학습 이미지 60,000개
# y_train : 학습 이미지의 정답
# x_test  : 테스트 이미지 10,000개
# y_test  : 테스트 이미지의 정답

(x_train, y_train), (x_test, y_test) = ds.mnist.load_data()


# ============================================================
# 2. 이미지 형태 변환
# ============================================================

# 기존 MNIST 이미지 크기: (28, 28)
#
# CNN은 이미지의 가로, 세로, 채널 정보가 필요함
#
# (28, 28, 1)
# 28 : 이미지 높이
# 28 : 이미지 너비
# 1  : 흑백 이미지 채널

x_train = x_train.reshape(60000, 28, 28, 1)
x_test = x_test.reshape(10000, 28, 28, 1)


# ============================================================
# 3. 이미지 정규화
# ============================================================

# 기존 픽셀값: 0~255
# 정규화 후: 0~1
#
# 신경망의 학습을 안정적으로 만들기 위해 사용

x_train = x_train.astype(np.float32) / 255.0
x_test = x_test.astype(np.float32) / 255.0


# ============================================================
# 4. 정답 데이터 원-핫 인코딩
# ============================================================

# 숫자 3의 원-핫 인코딩 예시
#
# [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
#
# 출력층이 10개이므로 정답을 10차원 벡터로 변환

y_train = tf.keras.utils.to_categorical(y_train, 10)
y_test = tf.keras.utils.to_categorical(y_test, 10)


# ============================================================
# 5. LeNet-5 CNN 모델 생성
# ============================================================

# Sequential:
# 여러 신경망 계층을 순서대로 연결

cnn = Sequential()

# 입력 이미지 크기: 28x28x1
cnn.add(Input(shape=(28, 28, 1)))

# 첫 번째 합성곱 계층
#
# filters=6:
# 6개의 필터를 사용하여 특징 추출
#
# kernel_size=(5,5):
# 5x5 크기의 필터 사용
#
# padding='same':
# 출력의 가로와 세로 크기를 입력과 동일하게 유지
#
# activation='relu':
# 음수는 0으로 변환하고 양수는 그대로 전달

cnn.add(Conv2D(
    6, (5, 5),
    padding='same',
    activation='relu'
))

# 첫 번째 최대 풀링 계층
#
# pool_size=(2,2):
# 2x2 영역에서 가장 큰 값 선택
#
# strides=2:
# 필터를 2칸씩 이동
#
# 이미지 크기: 28x28 -> 14x14

cnn.add(MaxPooling2D(
    pool_size=(2, 2),
    strides=2
))

# 두 번째 합성곱 계층
#
# 16개의 5x5 필터 사용
#
# padding='valid':
# 패딩 없이 합성곱 연산
#
# 이미지 크기: 14x14 -> 10x10

cnn.add(Conv2D(
    16, (5, 5),
    padding='valid',
    activation='relu'
))

# 두 번째 최대 풀링 계층
#
# 이미지 크기: 10x10 -> 5x5

cnn.add(MaxPooling2D(
    pool_size=(2, 2),
    strides=2
))

# 세 번째 합성곱 계층
#
# 120개의 5x5 필터 사용
#
# 이미지 크기: 5x5 -> 1x1

cnn.add(Conv2D(
    120, (5, 5),
    padding='valid',
    activation='relu'
))

# 다차원 특징맵을 1차원으로 변환
#
# (1,1,120) -> (120,)

cnn.add(Flatten())

# 완전연결 계층
#
# 84개의 뉴런을 사용하여 특징을 조합

cnn.add(Dense(
    units=84,
    activation='relu'
))

# 출력층
#
# 숫자 0~9를 구분하기 위해 10개의 뉴런 사용
#
# Softmax:
# 각 숫자에 대한 예측 확률을 계산

cnn.add(Dense(
    units=10,
    activation='softmax'
))


# ============================================================
# 6. 모델 컴파일
# ============================================================

# categorical_crossentropy:
# 다중 클래스 분류에 사용하는 손실 함수
#
# Adam:
# 신경망의 가중치를 업데이트하는 최적화 알고리즘
#
# learning_rate=0.001:
# 가중치 업데이트 크기를 결정하는 학습률
#
# accuracy:
# 정답을 맞힌 비율

cnn.compile(
    loss='categorical_crossentropy',
    optimizer=Adam(learning_rate=0.001),
    metrics=['accuracy']
)


# ============================================================
# 7. CNN 모델 학습
# ============================================================

# batch_size=128:
# 128개의 데이터를 하나의 묶음으로 학습
#
# epochs=30:
# 전체 60,000개 데이터를 30번 반복 학습
#
# validation_data:
# 학습 중 테스트 데이터로 성능 확인
#
# verbose=2:
# Epoch마다 학습 결과 출력

hist = cnn.fit(
    x_train,
    y_train,
    batch_size=128,
    epochs=30,
    validation_data=(x_test, y_test),
    verbose=2
)


# ============================================================
# 8. 학습 모델 평가
# ============================================================

# evaluate():
# 테스트 데이터 10,000개로 모델 성능 평가
#
# res[0] : 손실값
# res[1] : 정확도

res = cnn.evaluate(
    x_test,
    y_test,
    verbose=0
)

# 정확도를 백분율로 변환하여 출력
print("정확률=", res[1] * 100)
