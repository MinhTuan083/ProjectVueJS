<template>
    <h1>Interact Componet here...</h1>
    <card-flip v-for="(card, index) in cardsContext" 
    :key="index" 
    :ref="`card-${index}`"
    :imageBackFaceUrl="`images/${card}.png`" 
    :card="{ index, value: card}"
    @onFlip="checkRule($event)"
    />

</template>

<script>
import CardFlip from "./CardFruit.vue";
export default{
    props: {
        cardsContext:{
            type: Array,
            default: function () {
                return [];
                
            },
        },
    },
    components: {
        CardFlip,
    },
    data(){
        return{
            rules: [],
        };
    },
    methods: {
        checkRule(card){
                if(this.rules.length === 2 ) return false;

                this.rules.push(card);
            

                if(this.rules.length === 2 && this.rules[0].value === this.rules[1].value){
                    console.log("Right...");
                    
                }
                else if( this.rules.length === 2 &&
                 this.rules[0].value !== this.rules[1].value){
                    
                    console.log("Wrong...");

                   setTimeout(() => {
                     //close two card
                     this.$refs[`card-${this.rules[0].index}`][0].onFlipBackCard()
                    this.$refs[`card-${this.rules[1].index}`][0].onFlipBackCard()

                    //reset rules
                    this.rules = [];
                   }, 800);

                    
                 } else return false;
        }
    }
};

</script>