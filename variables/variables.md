### 컴퓨터가 값을 처리하는 과정 및 변수가 필요한 이유

메모리는 데이터를 저장할 수 있는 셀의 집합체이다. 메모리 셀 하나의 크기는 1바이트이며 컴퓨터는 1바이트 단위로 데이터를 저장하거나 읽어들인다.
각 셀은 고유 메모리 주소를 갖는다. 메모리 주소는 메모리 공간의 위치를 나타낸다.
(4GB 메모리는 0x00000000 ~ 0xFFFFFFFF)까지의 메모리 주소를 갖는다.
컴퓨터는 모든데이터를 2진수로 처리하고 저장한다.

10 + 20 을 연산 할때 10과 20을 각각 셀에 저장. 연산이 끝난 후에 30도 메모리에 저장되었지만 재사용할 수 없다.

따라서 기억하고 싶은 값을 메모리에 저장하고 저장된 값을 읽어 재사용하기 위해 변수라는 메커니즘을 제공한다.

***변수 : 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름
즉, 값의 위치를 가리키는 상징적인 이름.

### 식별자

변수의 이름을 식별자라고 한다.

```js
const variable = 30;
```

값은 메모리 공간에 저장되어 있다 값을 통해서 식별해내야 하는데, 이 식별자로 메모리주소를 기억해낸다.
***값이아니라 값을 메모리에 저장하고 메모리 주소를 식별자가 기억한다.

### 변수선언

변수 선언은 변수를 생성하는 것을 의미.
값을 저장하기 위한 메모리 공간을 확보, 메모리 공간의 주소를 연결해서 값을 저장할 수 있게 준비.
공간은 확보가 해제되기 전까지는 누구도 확보된 메모리 공간을 사용할 수 없도록 보호된다.

var , let, const 키워드로 변수를 선언한다.

> var : 함수레벨 스코프
> let, const : 블록레벨 스코프

JS엔진은 변수선언을 다음과 같은 2단계에 거쳐 수행한다.

> 1. 선언단계 : 변수 이름을 등록해서 자바스크립트 엔진에 변수의 존재를 알린다.
> 2. 초기화 단계 : 값을 저장하기 위한 메모리 공간을 확보하고 암묵적으로 undefined를 할당해 초기화한다.

```js
var score;
```

초기화 하지 않은 상태에서 곧바로 변수 값을 참조하면 쓰레기 값이 나올 수 있는데, JS는 암묵적으로 초기화를 수행하므로 이러한 위험에서 안전하다.

### 변수 선언의 실행시점과 호이스팅

변수선언은 런타임이 아닌 그 이전 단계에서 먼저 실행된다. (소스 평가 과정)
변수 선언 뿐 아니라 var, let, const, function, class 키워드를 사용해서 선언하는 모든 식별저는 호이스팅 한다. 모든 선언문은 런타임 이전에서 먼저 실행된다.

퀴즈 ) 첫 번째 줄에서 중단점을 찍고 전역에 선언된 변수는 무엇무엇이 있을까요 ?

```js
const a = 5;
let b = 3;

const outerFunc = () => {
  const a1 = 5;
  return a1;
};
outerFunc();
```

### 값의 할당

```js
var score = 80;
```

처럼 단축 표현해도 변수 선언과 값의 할당을 2개의 문으로 나누어 각각 실행한다.
변수의 선언은 런타임 이전에 먼저 실행되지만 값의 할당은 소스코드가 순차적으로 실행되는 런타임에 실행된다.

![스크린샷 2024-01-09 오후 6 26 03](https://github.com/HolyWatter/js-lovedive/assets/98324846/c606e24f-2f13-4fbc-b736-672cbc18df12)



매우매우 예측이 안갔다..

```js
console.log(score);

score = 80;

var score;

console.log(score);
```

### 재할당

![스크린샷 2024-01-09 오후 6 25 48](https://github.com/HolyWatter/js-lovedive/assets/98324846/a0d779b3-8663-4dd4-aea9-12d10d237a97)

새로운 메모리 공간에 90을 저장하고 score를 연결
=> undefined와 80은 가비지 콜렉터에 의해 메모리에서 자동 해제되지만, 언제 해제될지는 예측할 수 없다.

예약어

![스크린샷 2024-01-09 오후 6 25 05](https://github.com/HolyWatter/js-lovedive/assets/98324846/3ef7a7e1-a7a4-4c0b-b2b5-94d273534b33)

