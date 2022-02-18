<script>
import { onMount } from 'svelte';

    import { categoryName, locCategoryValue } from '../store/AppStore';

    let isOpen = false; // 펼침 여부 
    let curValue = $locCategoryValue; // select value
    let dropdownLayerDom;

    export let optionData; // props: select option data 
    export let name;

    $: isOptionDataArray = Array.isArray(optionData) && optionData.length > 0;
    $: console.log(`optionData: `, optionData); // re-run
    $: {
        if(curValue && isOptionDataArray) { // $는 state값이 해당 구문에 포함되어 있어야 실행되는 듯
            const category = optionData.find(v => v.boardAlias === curValue);
            const name = category && category.categoryName;
            
            name && categoryName.set(name);

            fetchList(curValue);
        }
    }

    onMount(() => {
        bodyClickEvent();
    });

    const bodyClickEvent = () => {
        document.body.addEventListener('click', e => {
            if(dropdownLayerDom && !dropdownLayerDom.contains(e.target)) {
                isOpen = false;
            }
        });
    };

    const btnClick = e => {
        isOpen = !isOpen;
    };

    const optionClick = (e, value, text) => {
        curValue = value;
        isOpen = false;
    };

    const fetchList = (value) => {
        console.log(`현재 value: ${value}`);
    };
</script>

{#if isOptionDataArray && name}
<div id="{name}" class="dropdown-wrap"  bind:this={dropdownLayerDom}>
    <div class="dropdown-btn">
        <button on:click={btnClick}>{$categoryName}</button>
    </div>
    <div class="dropdown-layer {isOpen ? 'open' : ''}">
        <ul>
            {#each optionData as data (data.categoryId)}
            <li class:active="{curValue === data.boardAlias}" on:click={e => { optionClick(e, data.boardAlias, data.categoryName); }}>
                {data.categoryName}
            </li>
            {/each}
        </ul>
    </div>
</div>
{/if}

<style>
.dropdown-wrap {
    width: 100%;
    max-width: 200px;
}

.dropdown-btn button {
    width: 100%;
    padding: 10px 0;
    font-size: 100%;
    border: 0;
    background: #eee;
    border: 1px solid #ccc;
    cursor: pointer;
}

.dropdown-layer {
    display: none;
}
.dropdown-layer.open {
    display: block;
}

.dropdown-layer li {
    width: 100%;
    padding: 10px 0;
    border: 1px solid #ccc;
    text-align: center;
    border-top: 0;
    cursor: pointer;
}
.dropdown-layer li.active {
    color: #fff;
    background: #333;
}
.dropdown-layer li:hover {
    background: rgba(0,0,0,0.2);
}
</style>
