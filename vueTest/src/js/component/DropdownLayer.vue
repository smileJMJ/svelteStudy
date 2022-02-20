<template>
    <div :id="name" class="dropdown-wrap" ref="dropdownLayerDom">
        <div class="dropdown-btn">
            <button @click="btnClick">{{ curCategoryName }}</button>
        </div>
        <div :class="['dropdown-layer', isOpen ? 'open' : '']">
            <ul>
                <li v-for="data in optionData"
                    :key = "data.categoryId"
                    :class="{active: curValue === data.boardAlias}"
                    @click="e => { optionClick(e, data.boardAlias, data.categoryName); }">
                    {{ data.categoryName }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DropdownLayer',
    props: {
        optionData: [],
        name: ''
    },
    data() {
        return {
            isOpen: false,
            curValue: null,
            curCategoryName: '선택하세요'
        };
    },
    mounted() {
        this.bodyClickEvent();
    },
    watch: {
        curValue(newValue) {
            const category = this.optionData.find(v => v.boardAlias === newValue);
            const name = category && category.categoryName;

            if(name) {
                this.curCategoryName = name;
                this.$emit('change-selected-category', name); // 부모의 state 변경
            }
            this.fetchList(newValue);
        }
    },
    methods: {
        // body 클릭 시 select 닫는 함수
        bodyClickEvent() {
            document.body.addEventListener('click', e => {
                const $dropdownLayerDom = this.$refs?.dropdownLayerDom;
                if($dropdownLayerDom && !$dropdownLayerDom.contains(e.target)) {
                    this.isOpen = false;
                }
            });
        },
        
        // 버튼 클릭
        btnClick() {
            this.isOpen = !this.isOpen;
        },

        // 옵션 클릭
        optionClick(e, value) {
            this.curValue = value;
            this.isOpen = false;
        },
        
        // 게시판 글 호출
        fetchList(value) {
            console.log(`현재 value: ${value}`);
        }
    }
}
</script>

<style scoped>
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