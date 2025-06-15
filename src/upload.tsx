import { useState, useRef, useEffect } from 'react';


import * as tf from '@tensorflow/tfjs';

// const model = await tf.loadGraphModel(
//   'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_100_224/classification/4/default/1'
// );


// 正確載入MobileNetV2的兩種方法
async function loadModel() {
  // 方法1：使用官方套件庫
  const mobilenet = await import('@tensorflow-models/mobilenet');
//   const model = await mobilenet.load({
//     version: 2,
//     alpha: 1.0
//   });
  
  // 方法2：直接載入GraphModel
  const model = await tf.loadGraphModel(
    'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_100_224/classification/4/default/1/model.json',
    { fromTFHub: true }
  );
  
  return model;
}



async function ImageUpload() {
  const [preview, setPreview] = useState<string>();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const model = await tf.loadGraphModel('/trained-model/model.json');

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange}
        ref={fileInput}
      />
      {preview && <img src={preview} alt="預覽" />}
    </div>
  );
}

export default ImageUpload