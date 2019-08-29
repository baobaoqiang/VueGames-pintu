<template>
    <div class="box">
        <span class="puzzle-count">走的步数：{{ stepNumber }}</span>
        <ul class="puzzle-ul">
            <li
                v-for="(puzzle, index) in puzzles"
                class="puzzle-li"
                @click="moveFn(index)"
                :class="{ 'puzzle-empty': !puzzle }"
            >
                {{ puzzle }}
            </li>
        </ul>

        <button class="puzzle-btn" @click="reSort">重置游戏</button>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "home",
    components: {},
    data() {
        return {
            puzzles: [],
            stepNumber: 0
        };
    },
    methods: {
        //经典的随机排列
        shuffle(arr) {
            let len = arr.length;
            for (let i = 0; i < len - 1; i++) {
                let idx = Math.floor(Math.random() * (len - i));
                let temp = arr[idx];
                arr[idx] = arr[len - i - 1];
                arr[len - i - 1] = temp;
            }
            return arr;
        },
        //重置渲染
        reSort() {
            this.puzzles = [];
            //生成1-15顺序数组
            for (let i = 1; i < 16; i++) {
                this.puzzles.push(i);
            }
            //随机打乱数组
            this.shuffle(this.puzzles);
            this.puzzles.push("");
            this.stepNumber = 0;
        },
        //点击方块移动
        moveFn(index) {
            //获取点击位置及其上下左右的值
            let curNum = this.puzzles[index],
                topNum = this.puzzles[index - 4],
                rightNum = this.puzzles[index + 1],
                bottomNum = this.puzzles[index + 4],
                leftNum = this.puzzles[index - 1];
            //和空值交换
            if (leftNum === "" && index % 4) {
                this.$set(this.puzzles, index - 1, curNum);
                this.$set(this.puzzles, index, "");
                this.stepNumber++;
            } else if (rightNum === "" && 3 !== index % 4) {
                this.$set(this.puzzles, index + 1, curNum);
                this.$set(this.puzzles, index, "");
                this.stepNumber++;
            } else if (topNum === "") {
                this.$set(this.puzzles, index - 4, curNum);
                this.$set(this.puzzles, index, "");
                this.stepNumber++;
            } else if (bottomNum === "") {
                this.$set(this.puzzles, index + 4, curNum);
                this.$set(this.puzzles, index, "");
                this.stepNumber++;
            }
            this.passFn();
        },
        //判断是否过关
        passFn() {
            if (this.puzzles[15] === "") {
                const newPuzzles = this.puzzles.slice(0, 15);
                const isPass = newPuzzles.every((e, i) => e === i + 1); //判断数组是否是1，2,3，...14,15
                if (isPass) {
                    alert(
                        `兄弟，恭喜你闯关成功！您一共走了${this.stepNumber}步`
                    );
                    this.reSort();
                }
            }
        }
    },
    mounted() {
        this.reSort();
    }
};
</script>
<style scoped>
.box {
    margin: auto;
    width: 400px;
}
.puzzle-count {
    font-size: 16px;
    display: block;
    text-align: left;
}
.puzzle-ul {
    list-style: none;
    overflow: hidden;
    padding-left: 0;
    margin-top: 0;
}
.puzzle-li {
    display: block;
    width: 98px;
    height: 98px;
    float: left;
    background-color: #ff7f24;
    border: 1px solid #bebebe;
    text-align: center;
    line-height: 100px;
    box-shadow: 1px 1px 4px #ccc;
    border-radius: 2px;
    text-shadow: 1px 1px 4px #ccc;
    font-size: 20px;
    cursor: pointer;
}
.puzzle-btn {
    width: 100%;
    height: 35px;
    background-color: #ff7f24;
    border-radius: 8px;
    cursor: pointer;
    color: #fff;
    box-shadow: inset 2px 2px 18px;
    border: 0;
}
.puzzle-empty {
    background-color: #8b8b7a;
    box-shadow: inset 2px 2px 18px;
}
</style>