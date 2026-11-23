
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch
import matplotlib.pyplot as plt

# 이미지 불러오기
img = Image.open("이직로그.jpg").convert("RGB")

# CLIP 모델 불러오기
processor = CLIPProcessor.from_pretrained(
    "openai/clip-vit-base-patch32"
)

model = CLIPModel.from_pretrained(
    "openai/clip-vit-base-patch32"
)

model.eval()

# 비교할 문장
captions = [
    "Three anime characters are working at a coffee shop",
    "Three anime characters are collaborating with EDIYA COFFEE",
    "Three anime characters are studying in a classroom",
    "Three anime characters are playing games at home"
]
# 이미지 및 텍스트 전처리
inputs = processor(
    text=captions,
    images=img,
    return_tensors="pt",
    padding=True
)

# 추론
with torch.no_grad():
    res = model(**inputs)

# 이미지 출력
plt.imshow(img)
plt.xticks([])
plt.yticks([])
plt.show()

# 확률 계산
logits = res.logits_per_image
probs = logits.softmax(dim=-1)

for i in range(len(captions)):
    print(
        captions[i],
        ":",
        "{:.2f}".format(float(probs[0, i] * 100))
    )
