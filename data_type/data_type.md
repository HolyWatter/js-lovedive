## 원시타입

1. Number
2. String
3. Boolean
4. Undefined
5. Null
6. Symbol

## 객체타입

- 객체, 함수, 배열...

## 데이터 타입의 필요성

- 값을 저장할 때 확보해야 하는 메모리 공간의 크기를 결정하기 위해
- 값을 참조할 때 한 번에 읽어 들여야 할 메모리 공간의 크기를 결정하기 위해
- 메모리에서 읽어 들인 2진수를 어떻게 해석할지 결정하기 위해

## 동적 타이밍

정적 타입 언어는 변수의 타입을 변경할 수 없으며, 변수에 선언한 타입에 맞는 값만 할당할 수 있다.
타입체크를 통과하지 못하면 에러를 발생.

```c
char c;
int num;
```

자바스크립트는 정적 타입 언어와 다르게 타입을 선언하지 않고 변수만 선언. 어떠한 데이터 타입의 값이라도 자유롭게 할당가능

```js
var foo;

console.log(typeof foo); //undefined

foo = 3;

console.log(typeof foo); //number

foo = "hello";

console.log(typeof foo); //string

foo = true;

console.log(typeof foo); //boolean

foo = null;

console.log(typeof foo); //object

foo = Symbol();

console.log(typeof foo); //symbol

foo = {};

console.log(typeof foo); //object

foo = [];

console.log(typeof foo); //object

foo = function () {};

console.log(typeof foo); //function
```

변수에 할당된 _값의 데이터 타입을 반환한다._
자바스크립트의 변수는 선언이 아닌 할당에 의해 타입이 추론된다.
재할당에 의해 언제든 동적으로 변할 수 있다.
개발자의 의도와 상관없이 엔진에 의해 암묵적으로 타입이 변환되기도 하며, 이런 특성은 유연성은 높지만 신뢰성은 떨어진다.

#### 주의해야할점

- 변수의 개수가 많으면 많을수록 오류가 발생할 확률 높아짐 최소한으로 유지하도록 주의
- 스코프를 최대한 좁게 만들어 부작용을 억지해야한다.
- 전역변수는 최대한 자제한다.
- const 를 사용해 값의 변경을 억제한다.
- 변수의 목적이나 의미를 파악할 수 있도록 네이밍한다.
