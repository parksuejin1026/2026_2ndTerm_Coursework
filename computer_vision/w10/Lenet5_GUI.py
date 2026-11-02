
# ============================================================
# CNN을 활용한 MNIST 손글씨 숫자 인식 프로그램
#
# - OpenCV로 숫자 5개를 작성할 수 있는 화면 생성
# - 마우스로 작성한 숫자 이미지를 28x28로 변환
# - 학습된 CNN 모델(cnn_v2.h5)을 불러와 숫자 인식
# - 숫자별 예측 결과 및 확률 출력
#
# 단축키
# e : 화면 초기화
# s : 작성한 숫자 이미지 확인
# r : CNN으로 숫자 인식
# q : 프로그램 종료
# ============================================================

import numpy as np
import tensorflow as tf
import cv2 as cv
import matplotlib.pyplot as plt


# ============================================================
# 1. 학습된 CNN 모델 불러오기
# ============================================================

# cnn_v2.h5 파일은 CNN 학습 코드에서 생성한 모델
#
# load_model():
# 저장된 모델의 신경망 구조와 가중치를 불러옴
#
# compile=False:
# 학습이 아닌 예측만 실행하므로 컴파일 정보를 생략

model = tf.keras.models.load_model(
    'cnn_v2.h5',
    compile=False
)


# ============================================================
# 2. 그림판 초기화 함수
# ============================================================

def reset():
    global img

    # 200x520 크기의 흰색 이미지 생성
    # 3은 BGR 컬러 채널
    img = np.ones((200, 520, 3), dtype=np.uint8) * 255

    # 숫자 5개를 작성할 영역 생성
    for i in range(5):
        cv.rectangle(
            img,
            (i * 100 + 10, 50),
            (i * 100 + 100, 150),
            (0, 0, 255),
            1
        )

    # 단축키 안내 문구 표시
    cv.putText(
        img,
        'e:erase s:show r:recognition q:quit',
        (10, 40),
        cv.FONT_HERSHEY_SIMPLEX,
        0.55,
        (255, 0, 0),
        1
    )


# ============================================================
# 3. 손글씨 숫자 이미지 추출
# ============================================================

def grab_numerals():
    numerals = []

    # 5개의 숫자 영역을 각각 추출
    for i in range(5):

        # ROI: 관심 영역
        # 각 사각형 내부의 숫자 이미지 추출
        roi = img[
            51:149,
            i * 100 + 11:(i + 1) * 100
        ]

        # 컬러 이미지를 흑백으로 변환
        gray = cv.cvtColor(roi, cv.COLOR_BGR2GRAY)

        # 흰색 배경과 검은색 글씨를 반전
        #
        # 기존: 흰색 배경 + 검은색 숫자
        # 변경: 검은색 배경 + 흰색 숫자
        #
        # MNIST 이미지의 형태와 동일하게 맞춤
        gray = 255 - gray

        # 28x28 크기로 변환
        roi = cv.resize(
            gray,
            (28, 28),
            interpolation=cv.INTER_CUBIC
        )

        # 숫자 이미지 저장
        numerals.append(roi)

    # 결과 형태: (5, 28, 28)
    return np.array(numerals)


# ============================================================
# 4. 변환된 숫자 이미지 확인
# ============================================================

def show():

    # 작성한 숫자 5개 추출
    numerals = grab_numerals()

    # 그래프 생성
    plt.figure(figsize=(10, 3))

    for i in range(5):

        # 1행 5열로 이미지 표시
        plt.subplot(1, 5, i + 1)

        # 숫자 이미지 출력
        plt.imshow(numerals[i], cmap='gray')

        # 좌표축 제거
        plt.xticks([])
        plt.yticks([])

    plt.show()


# ============================================================
# 5. CNN 모델을 이용한 숫자 인식
# ============================================================

def recognition():

    # 숫자 5개 추출
    numerals = grab_numerals()

    # CNN 입력 형태로 변환
    #
    # 기존 DMLP:
    # (5, 784)
    #
    # CNN:
    # (5, 28, 28, 1)
    #
    # 5  : 이미지 개수
    # 28 : 이미지 높이
    # 28 : 이미지 너비
    # 1  : 흑백 채널

    numerals = numerals.reshape(5, 28, 28, 1)

    # 픽셀값 정규화
    # 0~255 -> 0~1
    numerals = numerals.astype(np.float32) / 255.0

    # CNN 모델을 사용하여 예측
    #
    # 출력 형태: (5, 10)
    # 각 숫자 이미지에 대한 0~9의 예측 확률

    res = model.predict(numerals, verbose=0)

    # 가장 높은 예측 확률을 가진 숫자 선택
    #
    # axis=1:
    # 각 이미지의 10개 확률 중 최댓값의 인덱스 반환

    clas = np.argmax(res, axis=1)

    # 숫자 인식 결과 화면에 표시
    for i in range(5):

        # 사각형 아래에 예측 숫자 출력
        cv.putText(
            img,
            str(clas[i]),
            (i * 100 + 50, 185),
            cv.FONT_HERSHEY_SIMPLEX,
            1,
            (255, 0, 0),
            1
        )

        # 터미널에 예측 결과와 확률 출력
        confidence = np.max(res[i]) * 100

        print(
            f"{i + 1}번째 숫자: {clas[i]} "
            f"(예측 확률: {confidence:.2f}%)"
        )


# ============================================================
# 6. 마우스 브러시 설정
# ============================================================

# 브러시 반지름
BrushSiz = 4

# 브러시 색상: 검은색
LColor = (0, 0, 0)

# 마우스가 눌려 있는지 확인
drawing = False

# 이전 마우스 좌표
last_point = None


# ============================================================
# 7. 마우스 입력 처리
# ============================================================

def writing(event, x, y, flags, param):
    global drawing, last_point

    # 숫자를 작성할 수 있는 영역인지 검사
    def in_area(px, py):
        return 10 <= px < 500 and 51 <= py < 149

    # 마우스 왼쪽 버튼을 누른 경우
    if event == cv.EVENT_LBUTTONDOWN:
        drawing = True

        if in_area(x, y):
            last_point = (x, y)

            # 현재 위치에 검은색 원 생성
            cv.circle(
                img,
                (x, y),
                BrushSiz,
                LColor,
                -1
            )
        else:
            last_point = None

    # 왼쪽 버튼을 누른 상태로 이동
    elif event == cv.EVENT_MOUSEMOVE and drawing:

        if in_area(x, y):
            # 이전 좌표와 현재 좌표를 선으로 연결
            # 빠르게 움직여도 획이 끊기지 않도록 처리
            if last_point is not None:
                cv.line(
                    img,
                    last_point,
                    (x, y),
                    LColor,
                    BrushSiz * 2
                )

            last_point = (x, y)
        else:
            last_point = None

    # 마우스 왼쪽 버튼을 놓은 경우
    elif event == cv.EVENT_LBUTTONUP:
        drawing = False
        last_point = None


# ============================================================
# 8. 프로그램 시작
# ============================================================

# 그림판 초기화
reset()

# OpenCV 창 생성
cv.namedWindow('Writing')

# 마우스 이벤트와 writing 함수 연결
cv.setMouseCallback('Writing', writing)


# ============================================================
# 9. 키보드 입력 처리
# ============================================================

while True:

    # 그림판 화면 출력
    cv.imshow('Writing', img)

    # 키보드 입력 확인
    key = cv.waitKey(1) & 0xFF

    # e: 화면 초기화
    if key == ord('e'):
        reset()

    # s: 숫자 이미지 확인
    elif key == ord('s'):
        show()

    # r: CNN 숫자 인식
    elif key == ord('r'):
        recognition()

    # q: 프로그램 종료
    elif key == ord('q'):
        break


# ============================================================
# 10. 프로그램 종료
# ============================================================

# 모든 OpenCV 창 닫기
cv.destroyAllWindows()
