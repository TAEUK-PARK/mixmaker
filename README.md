# Mixmaker

<p align="center">
  <img style="width:500px" src="https://user-images.githubusercontent.com/110377189/204131792-f0ac29e2-a4cf-4778-9ff2-fef7d9005f4c.png" alt="vanillaide-logo" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/Styled Components-DB7093?style=flat-square&logo=styled-components&logoColor=black"/>
  <img src="https://img.shields.io/badge/Web Audio API-007CE2?style=flat-square"/>
  <img src="https://img.shields.io/badge/AudioWorklet-007CE2?style=flat-square"/>
  <!-- <img src="https://api.netlify.com/api/v1/badges/2af3c3e4-7d8c-4e2d-97fe-df89463460d7/deploy-status"  alt="Netlify-deploy-status" /> -->
</p>

## Introduction

Mixmaker는 녹음된 오디오 또는 오디오 파일의 원하는 구간을 자르고, 잘라 낸 오디오를 이어 붙여 하나의 오디오로 합칠 수 있게 하는 어플리케이션 입니다.

<br/>

## Motivation

Javascript를 학습하면서 어떤 파일에 컨트롤을 해 볼 기회가 없었습니다. <br/>
그래서 이번 프로젝트는 파일을 컨트롤하는 경험을 해보고 싶었습니다. <br/>
<br/>
저는 평소에 집에서 간단한 녹음을 자주 합니다. 단순히 녹음된 파일을 재생하고 관리하는 데에는 문제가 없지만 녹음된 파일을 편집하거나 믹싱하기 위해서는 아무리 간단한 작업이라도 무거운 소프트웨어를 사용하고 있었습니다. 그래서 간단한 1차 믹싱 정도는 손쉽게 가능한 어플리케이션을 만들어 보면 좋겠다고 생각했습니다.<br/>

# Contents

- [Mixmaker](#mixmaker)
- [Features](#features)
- [Tech Stacks](#tech-stacks)
  <br/>

# Challenges

## Atomic design pattern
디렉토리 구조를 정하던 중에 design pattern 주제의 글을 읽게 되었습니다. 그 글에서는 design pattern이 work flow를 결정한다고 언급하고 있었고 저는 과거 프로젝트의 비효율적인 경험을 떠올리고 '적절한' design pattern을 적용하고자 하였습니다. 그래서 결정한 것이 Atomic design pattern입니다. <br/>
<br/>
Brad Frost의 Atomic design pattern에 따르면 컴포넌트를 아래 다섯단계로 나누어서 생각하고, 만들어내는 것입니다.

- Atoms(원자): 가장 작은 단위의 컴포넌트입니다. 단순한 text나 버튼, 아이콘 등이 이에 해당합니다. 어디에나 가져다 쓸 수 있도록 다양한 
- Molecules
- Organisms
- Templates
- Pages

## Handle audio files

평소 오디오에 대한 지식이 있던 것도 아니고 기존에 javascript로 오디오를 비롯한 어떤 파일도 편집하거나 다뤄본 적이 없었습니다. 그런만큼 javascript상의 파일구조 및 오디오 파일 구조를 파악하는 것이 먼저 필요했습니다.

1. Todo

## Drag features

# Features

### Recording & Uploading

<p align="center">
  <img style="width:500px" src="https://user-images.githubusercontent.com/110377189/204138548-e4bc3a92-4e3f-4066-bdf8-72c2e9ab6571.png" alt="source" />
</p>

- 상단의 Record, Upload 버튼을 클릭하여 오디오 소스를 녹음하거나 가져올 수 있습니다.
- 가져온 오디오 소스는 파형 막대 형태로 화면에 표시됩니다.
- 오디오 소스의 파형 막대 부분을 드래그하면 구간을 선택할 수 있습니다.

### Playing

<p align="center">
  <img style="width:500px" src="https://user-images.githubusercontent.com/110377189/204139472-d3748670-6dc2-40d9-b8d9-60ada27584d8.gif" alt="source" />
</p>

- 재생 및 정지 버튼을 클릭하여 오디오 소스를 재생할 수 있습니다.
- 재생 시 현재 재생중인 위치에 따라 파형이 빨간색으로 변화합니다.
- 구간 선택시 선택한 구간만 재생됩니다.

### Cutting

<p align="center">
  <img style="width:500px" src="https://user-images.githubusercontent.com/110377189/204139529-7cf2f08b-7cac-47c7-9826-a19e0b488c4d.png" alt="source" />
</p>

- 선택한 구간을 잘라낼 수 있습니다.
- 잘라낸 오디오를 재생해볼 수 있습니다.

### Mixing

<p align="center">
  <img style="width:500px" src="https://user-images.githubusercontent.com/110377189/204139572-d5771ed1-7932-41c5-8526-c2d7abb8630e.png" alt="source" />
</p>

- 잘라낸 오디오를 drag and drop 하여 순서를 정할 수 있습니다.
- 재생버튼을 클릭하여 Mixing된 오디오를 재생할 수 있습니다.
- 다운로드 버튼을 클릭하여 Mixing된 오디오파일을 다운로드 받을 수 있습니다.

# Tech Stacks

### Client

- React
- Styled Components
- Web Audio API
- Audio Worklet

<!-- ### Testing
- Jest
- React Testing Library -->

<!-- ### Deployment
- Netlify -->

하나의 페이지로 이루어진 어플리케이션을 기획 했기 때문에 Routing이나 전역변수를 사용하지 않았습니다.

# Directory Structure

<details>
<summary>MIXMAKER</summary>
<div markdown="1">

```bash
.
├── src
   ├─ App.js
   ├─ components
   │  ├─ _Atoms
   │  │  ├─ Button.js
   │  │  ├─ Icon.js
   │  │  └─ Text.js
   │  ├─ _Modules
   │  │  ├─ CuttedAudioController
   │  │  │  ├─ CuttedAudio.js
   │  │  │  ├─ CuttedAudioBox.js
   │  │  │  └─ UpperBar.js
   │  │  ├─ CuttedAudioController.js
   │  │  ├─ MixedAudioController
   │  │  │  ├─ MixedAudio.js
   │  │  │  ├─ MixedAudioBox.js
   │  │  │  ├─ MixedAudioInit.js
   │  │  │  └─ MixedAudioPlayer.js
   │  │  ├─ MixedAuidoController.js
   │  │  ├─ SourceController
   │  │  │  ├─ SourceAddButtons.js
   │  │  │  ├─ SourceBox.js
   │  │  │  ├─ SourcePlayer.js
   │  │  │  ├─ SourceRecordButton.js
   │  │  │  ├─ SourceRemover.js
   │  │  │  ├─ SourceSelector.js
   │  │  │  ├─ SourceToolBar.js
   │  │  │  └─ SourceUploadButton.js
   │  │  └─ SourceController.js
   │  └─ _Templates
   │     └─ MixerTemplate.js
   ├─ constants
   │  ├─ audioProperties.js
   │  ├─ colors.js
   │  ├─ drawingProperties.js
   │  ├─ fonts.js
   │  └─ strings.js
   ├─ index.js
   ├─ reportWebVitals.js
   └─ utils
      ├─ addNumber.js
      ├─ audio
      │  ├─ changeAudioBufferToBlob.js
      │  ├─ changeBlobToAudioBuffer.js
      │  ├─ changeOffsetXToOffset.js
      │  ├─ changeOffsetXToSec.js
      │  ├─ drawSection.js
      │  ├─ drawSlider.js
      │  ├─ drawSliderCutted.js
      │  ├─ drawSoundWave.js
      │  ├─ getAudioEleFromSource.js
      │  ├─ getCurrentMouseX.js
      │  ├─ getMergedAudio.js
      │  ├─ getRawData.js
      │  ├─ getSample.js
      │  ├─ handlePlaying.js
      │  └─ trimAudioBuffer.js
      ├─ draggingSource
      │  ├─ addLeft.js
      │  ├─ addNext.js
      │  ├─ addRight.js
      │  ├─ getDragOverLocation.js
      │  └─ resetAction.js
      ├─ getAverage.js
      ├─ getFileType.js
      ├─ getIndexFromLength.js
      └─ throttle.js
```

</div>
</details>
<br/>

# How to start

- `npm install`
- `npm start`
