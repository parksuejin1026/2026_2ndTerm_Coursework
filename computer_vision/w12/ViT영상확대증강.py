
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.losses import SparseCategoricalCrossentropy
from tensorflow.keras.optimizers import Adam
import matplotlib.pyplot as plt

# CIFAR-10 데이터셋 불러오기
(x_train, y_train), (x_test, y_test) = keras.datasets.cifar10.load_data()

n_class = 10
img_siz = (32, 32, 3)
img_expanded_siz = (72, 72, 3)

patch_siz = 6
p2 = (img_expanded_siz[0] // patch_siz) ** 2
d_model = 64
h = 8
N = 6


# 이미지를 패치로 나누는 클래스
class Patches(layers.Layer):
    def __init__(self, patch_size):
        super().__init__()
        self.p_size = patch_size

    def call(self, img):
        batch_size = tf.shape(img)[0]

        patches = tf.image.extract_patches(
            images=img,
            sizes=[1, self.p_size, self.p_size, 1],
            strides=[1, self.p_size, self.p_size, 1],
            rates=[1, 1, 1, 1],
            padding="VALID"
        )

        patch_dims = patches.shape[-1]
        patches = tf.reshape(
            patches, [batch_size, -1, patch_dims]
        )
        return patches


# 패치 인코딩 클래스
class PatchEncoder(layers.Layer):
    def __init__(self, p2, d_model):
        super().__init__()
        self.p2 = p2
        self.projection = layers.Dense(units=d_model)
        self.position_embedding = layers.Embedding(
            input_dim=p2, output_dim=d_model
        )

    def call(self, patch):
        positions = tf.range(start=0, limit=self.p2, delta=1)
        encoded = self.projection(patch) + self.position_embedding(positions)
        return encoded


# ViT 모델 생성
def create_vit_classifier():
    input = layers.Input(shape=img_siz)
    nor = layers.Normalization()(input)

    # 32x32 영상을 72x72로 확대
    exp = layers.Resizing(
        img_expanded_siz[0],
        img_expanded_siz[1]
    )(nor)

    # 데이터 증강
    x = layers.RandomFlip("horizontal")(exp)
    x = layers.RandomRotation(factor=0.02)(x)
    x = layers.RandomZoom(
        height_factor=0.2,
        width_factor=0.2
    )(x)

    patches = Patches(patch_siz)(x)
    x = PatchEncoder(p2, d_model)(patches)

    # 이후는 11-1의 for _ in range(N): 부터 동일

    # Transformer Encoder 반복
    for _ in range(N):
        x1 = layers.LayerNormalization(epsilon=1e-6)(x)

        x2 = layers.MultiHeadAttention(
            num_heads=h,
            key_dim=d_model // h,
            dropout=0.1
        )(x1, x1)

        x3 = layers.Add()([x2, x])

        x4 = layers.LayerNormalization(epsilon=1e-6)(x3)
        x5 = layers.Dense(128, activation=tf.nn.gelu)(x4)
        x6 = layers.Dense(d_model, activation=tf.nn.gelu)(x5)
        x6 = layers.Dropout(0.1)(x6)

        x = layers.Add()([x3, x6])

    x = layers.LayerNormalization(epsilon=1e-6)(x)
    x = layers.Flatten()(x)
    x = layers.Dropout(0.5)(x)
    x = layers.Dense(2048, activation=tf.nn.gelu)(x)
    x = layers.Dropout(0.5)(x)
    x = layers.Dense(1024, activation=tf.nn.gelu)(x)
    x = layers.Dropout(0.5)(x)

    output = layers.Dense(n_class, activation="softmax")(x)

    model = keras.Model(inputs=input, outputs=output)
    return model


# 모델 생성
model = create_vit_classifier()

# 정규화 계층의 평균과 분산 설정
for layer in model.layers:
    if isinstance(layer, layers.Normalization):
        layer.adapt(x_train)
        break

# 컴파일
model.compile(
    optimizer=Adam(),
    loss=SparseCategoricalCrossentropy(from_logits=False),
    metrics=["accuracy"]
)

# 학습
hist = model.fit(
    x_train,
    y_train,
    batch_size=128,
    epochs=5,
    validation_data=(x_test, y_test),
    verbose=1
)

# 평가
res = model.evaluate(x_test, y_test, verbose=0)
print("정확률=", res[1] * 100)

# 정확도 그래프
plt.plot(hist.history["accuracy"])
plt.plot(hist.history["val_accuracy"])
plt.title("Accuracy graph")
plt.ylabel("Accuracy")
plt.xlabel("Epoch")
plt.legend(["Train", "Validation"])
plt.grid()
plt.show()

# 손실 그래프
plt.plot(hist.history["loss"])
plt.plot(hist.history["val_loss"])
plt.title("Loss graph")
plt.ylabel("Loss")
plt.xlabel("Epoch")
plt.legend(["Train", "Validation"])
plt.grid()
plt.show()
