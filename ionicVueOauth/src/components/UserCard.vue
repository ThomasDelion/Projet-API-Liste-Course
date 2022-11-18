<template>
  <div id="usercard">
    <p>ㅤ{{ produit }}ㅤ</p>
  <ion-list>
  <ion-item>
    <ion-select placeholder="Statut">
      <ion-select-option value="apples" class="droite">Acheté</ion-select-option>
      <ion-select-option value="oranges" class="droite">Pas acheté</ion-select-option>
    </ion-select>
  </ion-item>
</ion-list>
</div>
</template>



<script>
import {defineComponent, ref} from "vue";
import {IonSelectOption, } from "@ionic/vue";

export default defineComponent({
  produit: "UserCard.vue",
  components: { IonSelectOption, },
  props: {
    produit: String
  },

  setup() {
    let score = ref(0)

    const decrement = () => {
      score.value--
    }

    const increment = () => {
      score.value++
    }

    // eslint-disable-next-line vue/no-dupe-keys
    return {score, decrement, increment}
  }
});

</script>

<style scoped lang="scss">
#usercard {
  border: 1px solid #695252;
  border-radius: 5px;
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
}

.btn9 {
  margin-left: 10px;
}

</style>