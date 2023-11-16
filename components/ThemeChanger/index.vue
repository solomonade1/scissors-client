<template>
  <div class="toggle">
    <div
    class="toggleContainer rounded-xl flex items-center justify-between"
    @click="toggleTheme"
  >
    <div class="icon">🌙</div>
    <div class="icon">🔆</div>
    <div
      class="ball rounded-full"
      :class="colorMode.value === 'dark' ? 'darkTheme' : 'lightTheme'"
    />
  </div>
  </div>

</template>
<script setup>
const colorMode = useColorMode();
console.log(colorMode);
const toggleTheme = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};
</script>
<style >
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}

.icon body {
  color: #ebf4f1;
}
.dark-mode body {
  background-color: #0b101b;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}

.toggle {
  position: fixed;
  top: 40%;
  right: 5%;
}

.toggleContainer {
  width: 70px;
  height: 40px;
  padding: 5px;
  border: 2px solid #eb568b;
  position: relative;
  transition: all 2s ease;
  transform: rotate(90deg);
}

.icon {
  /* font-size: 20px; */
  /* flex: 1; */
  cursor: pointer;
  /* border: 1px solid red; */
  /* display: flex;align-items: center;
  justify-content: center; */
}


.ball {
  width: 35px;
  height: 25px;
  background-color: #144ee3;
  top: 5px;
  position: absolute;

}

.darkTheme {
  left: 5px;
}

.lightTheme {
  right: 5px;
  color: white;
}
</style>
