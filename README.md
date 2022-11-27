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

- Atoms(원자): <br/>가장 작은 단위의 컴포넌트입니다. HTML의 element 하나 단위를 Atom이라고 생각했습니다. 즉 text나 버튼 등이 이에 해당합니다. 어디에나 가져다 쓸 수 있도록 다양한 props를 받을 준비를 해두어야 합니다.
- Molecules(분자): <br/>원자를 조합해서 만들어진 컴포넌트입니다. 이 단계까지는 아직 우리가 생각하는 'component'의 모습이 아닙니다.
- Organisms(유기체): <br/>원자나 분자 또는 다른 유기체를 조합해서 만드는 컴포넌트입니다. 우리가 생각하는 'component'가 바로 이 단계입니다.
- Templates(템플릿): <br/>페이지의 틀입니다. 개발자가 제작할 페이지의 레이아웃을 잡아주는 역할입니다. 레이아웃 외의 style요소가 들어가지 않습니다.
- Pages(페이지): 템플릿에 유기체들을 넣어 만드는 최종적으로 디스플레이되는 컴포넌트입니다.

처음에 이 개념을 도입하려고 하였으나, 기간이 짧은 소규모 프로젝트인데에 비해 사전에 작업할 부분이 너무 커져서 세단계로 축약했습니다. <br/>

- Atoms: <br/>어디에서나 사용할 수 있는 'element'들을 제작해 두었습니다. 기본적으로 사용하는 default 설정값을 주어 대부분의 경우 그냥 import해서 사용하면 되도록 구성했습니다.
- Modules: <br/>우리가 생각하는 'component'의 개념입니다. 원자나 다른 모듈을 조합하여 구성했습니다.
- Templates: <br/>'page'의 개념입니다.

### Pros and Cons

- Atom의 재사용성 (+)
- 컴포넌트의 역할분리/관심사분리 (+)
- 기능별로 컴포넌트가 나눠져 있기 때문에 컴포넌트가 읽기 쉬워짐 (+)
- Atom에 스타일요소를 추가할 때 마다 props를 추가하는 작업 필요 (-)
- 유사한 기능의 Module이 계속 추가되면서 로직이 위치한 곳을 찾기 어려워짐 (-)
- state를 prop으로 가질 경우 깊어진 컴포넌트 구조 때문에 drilling 발생 (-)
- 새로운 Atom이나 Module을 추가하는 경우 시간이 오래걸림 (-)
- 컴포넌트 이름이 너무 많아지면서 naming 고민하는 시간이 오래걸림 (-)

### Points to improve

만약 다음 리액트 프로젝트를 진행하게 되거나 이 프로젝트를 리팩토링하게 된다면?..

- Molecules와 Organisms는 분리하기
- prop drilling은 필연적이다. 전역변수의 관리가 용이한 방법을 사용하기(jotai, redux)
- 기능적인 부분은 모두 Organisms에서 관리하기(모든 로직은 Organisms에 위치)
- Composition(합성) 사용하기

또는 내가 직접 가장 적합한 design pattern을 설계해서 적용해보고 싶습니다.

## Programming method

프로젝트를 진행하면서 점점 길어지는 코드를 보고 '모든 코드를 역할(기능)에 따라 함수 하나씩으로 분리해서 사용해서 축약한다면 좋을 것 같다'라는 생각을 하게 되었습니다.<br/>
<br/>
결국 '읽는 사람'으로 하여금 아 지금 내가 읽고 있는 부분이 어떤 로직을 수행하고 있구나라는 것을 '함수명'을 통해 알려주면 좋을 거라 생각했습니다.
<br/>
이를 위해 util함수를 상당히 많이 만들었고, 만들어 둔 util함수의 재사용을 경험하기도 하면서 향후 프로그래밍을 할때 어떻게 해야할 지 몇가지 영감을 얻을 수 있었습니다.

- 계산하는 함수의 경우 재사용성 고려해서 만들기
- util함수의 파라미터명을 들어올 타입이 무엇인지 알기쉽게 정하기
- 

## Handle audio files

평소 오디오에 대한 지식이 있던 것도 아니고 기존에 javascript로 오디오를 비롯한 어떤 파일도 편집하거나 다뤄본 적이 없었습니다. 그런만큼 javascript상의 파일구조 및 오디오 파일 구조를 파악하는 것이 먼저 필요했습니다.

1. Todo

## Drag features

Todo

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
