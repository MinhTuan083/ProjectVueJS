<template>
    <div class="card" :class="{ disable: isDisable }" :style="{
        height: `${(750 - 16 * 4) / Math.sqrt(cardsContext.length) - 16}px`,
        width: `${
            (((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) / 4 }px`,
    }">
        <div class="card_inner" :class="{ 'is-flipped': isFlipped }" @click="onToggleFlipCard">
            <div class="card_face card_face--front">
                <div class="card_content" :style="{
                    backgroundSize: `${
            (((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) / 4 /3 }px`,
                perpective: `${
            ((((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) / 4) *2 } px`,
                }">
                </div>
            </div>
            <div class="card_face card_face--back">
                <div class="card_content" :style="{ backgroundImage: `url(${require('@/assets/' + imageBackFaceUrl)})`}"></div>
            </div>           
        </div>
    </div>
</template>

<script>
export default{
    props: {
        card:{
            type: [String, Number, Array, Object],

        },
        imageBackFaceUrl: {
            type : String,
            required: true,
        },
        cardsContext: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return{
            isDisable: false,
            isFlipped: false,
        };
    },
    methods: {
        onToggleFlipCard() {
            if(this.isDisable) return false;
            this.isFlipped = !this.isFlipped;
         if(this.isFlipped) this.$emit("onFlip", this.card);
        },
        onFlipBackCard() {
            this.isFlipped = false;
        },
        onEnableDisableModel() {
            this.isDisable = true;
        },
    },
};
</script>

<style lang="css" scoped>
.card{
    display: inline-block;
    margin-right: 1rem;
    margin-bottom: 1rem;
}
.card_inner{
    width: 100%;
    height: 100%;
    transition: transform 1s;
    transform-style: preserve-3d;
    cursor: pointer;
    position: relative;
}
.card_inner.is-flipped{
    transform: rotateY(-180deg);
}
.card.disable .card_inner{
    cursor: default;
}
.card_face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    overflow: hidden;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.2);

}
.card_face--front .card_content{
    background: url("../assets/images/icon-back.png") no-repeat center center ;
    height: 100%;
    width: 100%;
}
.card_face--back{
    background-color: var(--light);
    transform: rotateY(-180deg);
}
.card_face--back .card_content{
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
}
</style>