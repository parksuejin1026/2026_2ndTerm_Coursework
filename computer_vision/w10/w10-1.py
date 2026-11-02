
# ============================================================
# MNIST 손글씨 숫자 인식 딥러닝 모델 학습
# - MNIST 데이터셋을 이용하여 숫자 0~9를 학습
# - 다층 퍼셉트론(DMLP) 신경망 사용
# - 학습이 완료된 모델을 dmlp_trained.h5 파일로 저장
# ============================================================

import numpy as np
import tensorflow as tf
import tensorflow.keras.datasets as ds

# 신경망 모델 및 계층 생성에 필요한 라이브러리
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Input
from tensorflow.keras.optimizers import Adam

# 학습 결과를 그래프로 출력하기 위한 라이브러리
import matplotlib.pyplot as plt


# ============================================================
# 1. MNIST 데이터셋 불러오기
# ============================================================

# MNIST는 0~9까지의 손글씨 숫자 이미지 데이터셋
# 각 이미지는 28x28 크기의 흑백 이미지
#
# x_train : 학습 이미지 60,000개
# y_train : 학습 이미지에 대한 정답
# x_test  : 테스트 이미지 10,000개
# y_test  : 테스트 이미지에 대한 정답

(x_train, y_train), (x_test, y_test) = ds.mnist.load_data()


# ============================================================
# 2. 이미지 데이터 형태 변환 (Flatten)
# ============================================================

# 원본 이미지 크기: 28x28
# Dense 신경망에 입력하기 위해 1차원 배열로 변환
#
# 28 x 28 = 784
#
# 변환 전: (60000, 28, 28)
# 변환 후: (60000, 784)

x_train = x_train.reshape(60000, 784)
x_test = x_test.reshape(10000, 784)


# ============================================================
# 3. 이미지 정규화 (Normalization)
# ============================================================

# 이미지 픽셀 값은 0~255 범위
#
# 0   : 검은색
# 255 : 흰색
#
# 모든 픽셀을 255로 나누어 0~1 범위로 변환
# 신경망이 안정적으로 학습할 수 있도록 도와줌
#
# float32는 소수점 계산을 위한 자료형

x_train = x_train.astype(np.float32) / 255.0
x_test = x_test.astype(np.float32) / 255.0


# ============================================================
# 4. 정답 데이터 원-핫 인코딩 (One-Hot Encoding)
# ============================================================

# 원래 정답은 0~9의 정수
#
# 예시:
# 숫자 3 -> 3
#
# 원-핫 인코딩 후:
# 숫자 3 -> [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
#
# 10개 위치 중 정답에 해당하는 위치만 1
# 나머지는 모두 0

y_train = tf.keras.utils.to_categorical(y_train, 10)
y_test = tf.keras.utils.to_categorical(y_test, 10)


# ============================================================
# 5. 딥러닝 모델 생성
# ============================================================

# Sequential:
# 신경망 계층을 순서대로 쌓는 모델
#
# Dense:
# 이전 계층의 모든 뉴런이 다음 계층의 뉴런과 연결되는
# 완전연결 계층(Fully Connected Layer)

dmlp = Sequential()

# 입력층
# MNIST 이미지를 784개의 픽셀 값으로 입력
dmlp.add(Input(shape=(784,)))

# 첫 번째 은닉층
# 뉴런 1024개
# ReLU: 음수는 0으로, 양수는 그대로 전달하는 활성화 함수
dmlp.add(Dense(units=1024, activation='relu'))

# 두 번째 은닉층
# 뉴런 512개
dmlp.add(Dense(units=512, activation='relu'))

# 세 번째 은닉층
# 뉴런 512개
dmlp.add(Dense(units=512, activation='relu'))

# 출력층
# 숫자 0~9를 구분해야 하므로 뉴런 10개
#
# Softmax:
# 10개 숫자 각각에 대한 예측 확률 계산
# 출력 확률의 합은 1
dmlp.add(Dense(units=10, activation='softmax'))


# ============================================================
# 6. 모델 컴파일 (Compile)
# ============================================================

# loss:
# 예측값과 실제 정답의 차이를 계산하는 손실 함수
#
# categorical_crossentropy:
# 원-핫 인코딩된 다중 클래스 분류에 사용
#
# optimizer:
# 손실을 줄이기 위해 가중치를 업데이트하는 최적화 알고리즘
#
# Adam:
# 학습률을 조절하며 가중치를 업데이트하는 최적화 알고리즘
#
# learning_rate=0.0001:
# 가중치를 한 번에 얼마나 변경할지 결정하는 학습률
#
# accuracy:
# 실제 정답을 맞힌 비율을 측정하는 평가 지표

dmlp.compile(
    loss='categorical_crossentropy',
    optimizer=Adam(learning_rate=0.0001),
    metrics=['accuracy']
)


# ============================================================
# 7. 딥러닝 모델 학습
# ============================================================

# fit():
# 학습 데이터를 이용해 신경망의 가중치를 학습
#
# batch_size=128:
# 이미지 128개를 하나의 묶음으로 학습
#
# epochs=50:
# 전체 학습 데이터를 50번 반복 학습
#
# validation_data:
# 각 epoch가 끝날 때 모델의 성능 확인
#
# verbose=2:
# epoch별 학습 결과를 한 줄씩 출력
#
# hist:
# 학습 과정에서 발생한 정확도와 손실 기록을 저장

hist = dmlp.fit(
    x_train,
    y_train,
    batch_size=128,
    epochs=50,
    validation_data=(x_test, y_test),
    verbose=2
)


# ============================================================
# 8. 모델 성능 평가
# ============================================================

# evaluate():
# 테스트 이미지 10,000개를 이용해 성능 측정
#
# loss:
# 테스트 데이터에 대한 손실값
#
# accuracy:
# 테스트 데이터에서 정답을 맞힌 비율
#
# 예:
# accuracy = 0.98
# 정확도 = 98%

loss, accuracy = dmlp.evaluate(
    x_test,
    y_test,
    verbose=0
)

print(f"정확률 = {accuracy * 100:.2f}%")


# ============================================================
# 9. 학습 완료된 모델 저장
# ============================================================

# 학습된 모델의 구조와 가중치를 파일로 저장
#
# 저장된 모델은 다시 학습하지 않고 불러와서 사용 가능
#
# 47~50페이지의 숫자 인식 프로그램에서 사용

dmlp.save('dmlp_trained.h5')


# ============================================================
# 10. 정확도(Accuracy) 그래프 출력
# ============================================================

# hist.history['accuracy']:
# 학습 데이터의 epoch별 정확도
#
# hist.history['val_accuracy']:
# 검증 데이터의 epoch별 정확도
#
# 두 그래프를 비교하여 학습 성능을 확인

plt.plot(hist.history['accuracy'])
plt.plot(hist.history['val_accuracy'])

plt.title('Accuracy graph')
plt.xlabel('epochs')
plt.ylabel('accuracy')

plt.legend(['train', 'test'])
plt.grid()
plt.show()


# ============================================================
# 11. 손실(Loss) 그래프 출력
# ============================================================

# loss:
# 학습 데이터의 손실
#
# val_loss:
# 검증 데이터의 손실
#
# 일반적으로 손실값이 낮아지면 학습이 진행되고 있다는 의미
#
# 학습 손실만 낮아지고 검증 손실이 증가한다면
# 과적합(Overfitting)을 의심할 수 있음

plt.plot(hist.history['loss'])
plt.plot(hist.history['val_loss'])

plt.title('Loss graph')
plt.xlabel('epochs')
plt.ylabel('loss')

plt.legend(['train', 'test'])
plt.grid()
plt.show()
