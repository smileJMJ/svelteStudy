<script>
    import { onMount } from 'svelte';
    import { selectedCategory, locCategoryValue } from '../store/AppStore';

    // state
    let isOpen = false; // 펼침 여부 
    let curValue = $locCategoryValue; // selected value
    let curCategoryName = '선택하세요';
    let dropdownLayerDom;

    // props
    export let optionData = [];
    export let name = '';

    // Update(re-run)
    $: console.log(`optionData: `, optionData);
    $: {
        const category = optionData.find(v => v.boardAlias === curValue);
        const name = category && category.categoryName;
        
        if(name) {
            curCategoryName = name;
            selectedCategory.set(name); // store - update
        }

        fetchList(curValue);
    }

    // Mount
    onMount(() => {
        bodyClickEvent();
    });

    // body 클릭 시 select 닫는 함수
    const bodyClickEvent = () => {
        document.body.addEventListener('click', e => {
            if(dropdownLayerDom && !dropdownLayerDom.contains(e.target)) {
                isOpen = false;
            }
        });
    };

    // 버튼 클릭 - select 펼침/닫힘
    const btnClick = e => {
        isOpen = !isOpen;
    };

    // 옵션 클릭 - curValue 변경, select 닫힘
    const optionClick = (e, value) => {
        curValue = value;
        isOpen = false;
    };

    // 게시판 글 호출
    const fetchList = (value) => {
        console.log(`현재 value: ${value}`);
    };
</script>

<div id={name} class="dropdown-wrap"  bind:this={dropdownLayerDom}>
    <div class="dropdown-btn">
        <button on:click={btnClick}>{curCategoryName}</button>
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
