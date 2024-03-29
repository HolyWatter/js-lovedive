### MDN의 정의

- A cloosure is the combination of a function and the lexical environment within which that function was declared
- 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

공부를 하고 새로 Closure에 대해 정의를 해보자면
상위함수보다 하위함수가 더 오래 살아있는 경우.
혹은 실행컨텍스트가 종료된 이후에도 계속 해당 환경의 값을 참조할 수 있는 현상. 이라고 할 수 있겠다.

### 함수가 선언된 렉시컬 환경

```js
const x = 1;

function 외부함수() {
  const x = 10;

  function 내부함수() {
    console.log(x);
  }

  innerFunc();
}

외부함수();
```

내부함수의 상위스코프는 외부함수의 스코프이다.
내부함수가 외부함수의 중첩함수로써 외부함수의 변수 x에 접근할 수 있다.
내부함수가 중첩함수가 아니라면 외부함수의 변수에 접근할 수 없다.

위의 코드는 중첩함수로써 외부함수의 변수 x에 접근하는 경우
밑에는 중첩함수가 아니라 외부함수의 변수에 접근할 수 없는 경우이다.

```js
const x = 1;

function 외부함수() {
  const x = 10;
  내부함수();
}

function 내부함수() {
  console.log(x);
}

외부함수();
```

### ~~렉시컬 스코프~~

~~js 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디에 정의했는지에 따라 상위스코프를 결정한다. 이를 렉시컬 스코프라고 한다.~~

### 함수 객체의 내부 슬롯

함수는 자신의 내부 슬롯에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다.

### 클로저와 렉시컬 환경

```js
const x = 1;

function 외부함수() {
  const x = 10;
  const innner = function () {
    console.log(x);
  };
  return inner();
}

const 내부함수 = 외부함수();

내부함수(); //10
```

외부함수를 실행시켜 내부함수에 inner를 반환하는 순간 외부함수는 생명주기를 마감하고 실행컨텍스트 스택에서 제거된다.
따라서 외부함수의 지역변수 x는 유효하지 않아 접근할 수 없어야 하는 것 처럼 보이지만 10의 값을 잘 출력하면서 동작하고 있다.

외부함수보다 중첩함수가 더 오래 유지되는 경우 중첩함수는 이미 생명주기가 종료한 외부함수의 변수를 참조할 수 있는데, **이러한 중첩함수를 클로저라고 부른다.**

js의 모든 함수는 함수를 어디서 호출하든 상관없이 자신의 상위 스코프를 기억한다.

외부함수를 호출하면 외부함수의 렉시컬 환경이 생성되고 앞서 외부함수 객체의 내부슬롯에 저장된 전역 렉시컬 환경을 "외부 렉시컬 환경에 대한 참조"에 할당한다.

그리고 중첩 함수인 inner가 평가된다. inner는 자신의 내부슬롯에 현재 실행중인 실행컨텍스트의 렉시컬환경인 outer함수의 렉시컬 환경을 상위스코프로서 저장한다.

외부함수의 실행이 종료해도 inner함수는 전역변수 내부함수에 의해 참조되고 있으므로 가비지 컬렉션의 대상이 되지 않는다.
가비지 컬렉터는 누군가가 참조하고 있는 메모리 공간을 함부로 해제하지 않는다.

### 활용

상태를 안전하게 변경하고 유지하기 위해 사용.
상태가 의도치 않게 변경되지 않도록 상태를 안전하게 은닉, 특정 함수에게만 상태변경을 허용하기 위해 사용함.
