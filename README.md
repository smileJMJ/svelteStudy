# Svelte란?
- 컴포넌트를 JS로 바꿔주는 컴파일러
- 프레임워크   
- .svelete 파일로 구성하여 HTML, CSS, JS를 캡슐화한 재사용 가능한 코드 블록으로 생성   


(참고)   
<a href="https://svelte.dev/blog/the-easiest-way-to-get-started" target="_blank">https://svelte.dev/blog/the-easiest-way-to-get-started</a>      
<a href="https://svelte.dev/tutorial/basics" target="_blank">https://svelte.dev/tutorial/basics</a>   

<br>
<br>

## 변수 선언 및 Data 추가
```
<script>
	let name = 'world';
</script>

<h1>Hello {name}!</h1>
```

<br>
<br>

## styling
```
<p>This is a paragraph.</p>

<style>
	/* Write your CSS here */
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

```

<br>
<br>

## Nested Components
```
// App.svelte
<script>
	import Nested from './Nested.svelte';
</script>

<p>This is a App.</p>
<Nested/>


// Nested.svelte
<p>Nested Components: This is Nested.</p>
```

<br>
<br>

## HTML Tags
```
<script>
	let string = `this string contains some <strong>HTML!!!</strong>`; // string
	let strHtml = '<div class="box"><p>String HTML Tag</p></div>';
</script>

<p>{string}</p>
{@html strHtml}
```
- 기본 텍스트는 string으로 인식
- string HTML 주입 시에는 ``{@html ...}`` 사용하기

<br>
<br>

## Making an app
- 각 빌드 툴에 Svelte를 연결해서 사용 가능하며, svelte에서 플러그인을 제공하고 있음   
ex) vite-plugin-svelte, rollup-plugin-svelte, svelte-loader 등   
(참고) https://sveltesociety.dev/tools/   

※ vite   
모듈 수가 많은 대규모 프로젝트의 번들링 속도를 높이고자 브라우저에서 지원하는 ES Modules(ESM) 및 네이티브 언어로 작성된 JavaScript 도구 등을 활용한 프론트엔드 개발 툴


※ rollup   
작은 코드 조각을 라이브러리/어플리케이션과 같이 더 크고 복잡한 형태로 컴파일하는 모듈 번들러   


<br>
<br>
<br>

# Reactivity
Svelte는 DOM을 애플리케이션 상태와 동기화하기 위한 강력한 반응성 시스템이 있음   

<br>
<br>

## Assignments
```
<script>
	let count = 0;

	function incrementCount() {
		count += 1;
	}
</script>

<button on:click={incrementCount}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

<br>
<br>

## Declarations
- Svelte는 state 값이 변할 때 자동적으로 DOM을 변경함
- 종종 state 연산이 필요할 때, state값이 변하면 재연산을 진행함 
<br>
```
<script>
    $: 변수명 = state 연산;
</script>
```
의미: 참조된 값이 변경될 때마다 이 코드를 다시 실행하라   


Ex)
```
<script>
	let count = 0;
	$: doubled = count * 2;

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
<p>
	doubled: {doubled}
</p>
```

<br>
<br>

## Statements
- state의 변화 발생 시 값 할당 및 구문 실행도 가능함
```
<script>
	let count = 0;
	$: console.log(`the count is ${count}`);
	$: {
		console.log(`the count is ${count}`);
		console.log(`the double is ${count * 2}`);
	}
	$: if(count >= 10) {
		console.log('count is dangerously high!');
		count = 9;
	}

	function handleClick() {
		count += 1;
	}
</script>
```

<br>
<br>

## Updating arrays and objects
- array, object 등 불변성 유지해야 함
```
<script>
	let numArr = [];
	let obj = {};
	
	function notReactArr() {
		numArr.push(1);
	}
	function notReactObj() {
		Object.assign(obj, {a: 1});
	}
	function reactArr() {
		numArr = [...numArr, 1];
	}
	function reactObj() {
		obj = {...obj, a: 1};
	}
</script>

<button on:click={notReactArr}>notReactArr: {numArr.length}</button>
<button on:click={reactArr}>reactArr: {numArr.length}</button>
<br>
<button on:click={notReactObj}>notReactArr: {obj.a}</button>
<button on:click={reactObj}>reactObj: {obj.a}</button>
```

<br>
<br>

# Props

## Declaring props
- child components에서 ``export``로 props property 선언해야 함
- 이 때, 값을 할당하면 props 없을 때 default value로 노출됨
- object properties는 ``spread``를 이용함

<br>

[ export 를 이용한 props 선언 ]
```
// App.svelte
<script>
	import Nested from './Nested.svelte';
</script>

<Nested answer={42}/>

// Nested.svelte
<script>
    // export로 props property 정의해야 함
	export let answer = 'a mystery';  // 할당한 값은 default value
</script>

<p>The answer is {answer}</p>
```

<br>

[ object props 사용 전 ]
```
// App.svelte
<script>
	import Info from './Info.svelte';

	const pkg = {
		name: 'svelte',
		version: 3,
		speed: 'blazing',
		website: 'https://svelte.dev'
	};
</script>

<Info name={pkg.name} version={pkg.version} speed={pkg.speed} website={pkg.website}/>

// Info.svelte
<script>
	export let name;
	export let version;
	export let speed;
	export let website;
</script>

<p>
	The <code>{name}</code> package is {speed} fast.
	Download version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>
	and <a href={website}>learn more here</a>
</p>
```

<br>

[ object props(spread) 사용 ]
```
```






