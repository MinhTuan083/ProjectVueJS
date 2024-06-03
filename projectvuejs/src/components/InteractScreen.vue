<template>
    <div class="screen">
        <div class="screen_inner" :style="{ width: `${
            ((((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) / 4 +
            16) * Math.sqrt(cardsContext.length)
            }px`,
            }"
            >


            <card-flip v-for="(card, index) in cardsContext" :key="index" :ref="`card-${index}`"
                :imageBackFaceUrl="`images/${card}.png`" :card="{ index, value: card }" :cardsContext="cardsContext"
                @onFlip="checkRule($event)" />
        </div>
    </div>
</template>

<script>
import CardFlip from "./CardFruit.vue";
export default {
    props: {
        cardsContext: {
            type: Array,
            default: function () {
                return [];

            },
        },
    },
    components: {
        CardFlip,
    },
    data() {
        return {
            rules: [],
        };
    },
    methods: {
        checkRule(card) {
            if (this.rules.length === 2) return false;

            this.rules.push(card);


            if (this.rules.length === 2 && this.rules[0].value === this.rules[1].value) {
                console.log("Right...");
                //add class disable to component
                this.$refs[`card-${this.rules[0].index}`][0].onEnableDisableModel();
                this.$refs[`card-${this.rules[1].index}`][0].onEnableDisableModel();
                //reset rule to []
                this.rules = [];

                const disableElement = document.querySelectorAll(".screen .card.disable");
                if (disableElement && disableElement.length == this.cardsContext.length - 2) {
                    setTimeout(() => {
                        this.$emit("onFinish");
                    }, 950);
                }
            }
            else if (this.rules.length === 2 &&
                this.rules[0].value !== this.rules[1].value) {

                console.log("Wrong...");

                setTimeout(() => {
                    //close two card
                    this.$refs[`card-${this.rules[0].index}`][0].onFlipBackCard()
                    this.$refs[`card-${this.rules[1].index}`][0].onFlipBackCard()

                    //reset rules
                    this.rules = [];
                }, 500);


            } else return false;
        }
    }
};

</script>

<style lang="css" scoped>
.screen {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: var(--dark);
    color: var(--light);
}

.screen_inner {
    display: flex;
    flex-wrap: wrap;
    margin: 2rem auto;

}
</style>