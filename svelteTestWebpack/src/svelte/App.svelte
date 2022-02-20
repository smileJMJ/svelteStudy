<script>
	import { onMount } from 'svelte';
	import { selectedCategory } from './store/AppStore';
	import DropdownLayer from './component/DropdownLayer.svelte';

	let data;

	// Mount
	onMount(() => {
		fetch('http://localhost:8081/data')
		.then(res => res.json())
		.then(res => data = res);
	});
</script>

<main>
	{#if Array.isArray(data) && data.length > 0}
		{#if typeof $selectedCategory === 'string'}
		<p>선택한 카테고리명은 <strong>{$selectedCategory}</strong>입니다.</p>
		{:else}
		<p>카테고리를 선택하세요.</p>
		{/if}
		<DropdownLayer name="select1" optionData="{data}"/>
	{/if}
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	p {
		margin-bottom: 20px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
