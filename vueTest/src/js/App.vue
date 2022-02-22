<template>
    <div v-if="isOptionData">
        <p v-if="isSelectedCategory">선택한 카테고리명은 <strong>{{selectedCategory}}</strong>입니다.</p>
        <p v-else>카테고리를 선택하세요.</p>
        <dropdown-layer 
            name="select1" 
            :option-data="optionData" 
            @change-selected-category="changeSelectedCategory"
        />
    </div>
</template>

<script>
import DropdownLayer from './component/DropdownLayer.vue';

export default {
    name: 'App',
    components: {
        DropdownLayer
    },
    mounted() {
        fetch('http://localhost:8081/data')
            .then(res => res.json())
            .then(res => {
                this.optionData = res;
            });
    },
    data() {
        return {
            optionData: null,
            selectedCategory: null
        }
    },
    computed: {
        isOptionData() {
            return Array.isArray(this.optionData) && this.optionData.length > 0;
        },
        isSelectedCategory() {
            return typeof this.selectedCategory === 'string';
        }
    },
    methods: {
        changeSelectedCategory(value) {
            console.log('$emit', value);
            this.selectedCategory = value;
        }
    }
}
</script>

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
