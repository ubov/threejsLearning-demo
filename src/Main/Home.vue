<template>
    <div id="stage" ref="stage">

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import { Game } from "../Game";
const stage: Ref<null|HTMLElement> = ref(null)
let game: Game;

onMounted(() => {
    if (stage.value) {
        const stageSize = (stage.value as HTMLElement).getBoundingClientRect()
        game = new Game(stageSize.width, stageSize.height)
        window.game = game
        stage.value.appendChild(game.renderer.domElement)
        game.play()
        // game.test()
    }
})
</script>

<style scoped>
#stage {
    width: 100vw;
    height: 720px;
}
</style>