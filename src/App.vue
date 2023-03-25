<script setup lang="ts">
</script>

<template>
  <div>
    <nav>
      <router-link to="/soli">Nueva Solicid</router-link>&nbsp;
      <router-link to="/historic"> Historial</router-link>
    </nav>
  </div>

    <RouterView name="default" v-slot="{ Component, route }">
            <transition
              mode="out-in"
              :duration="300"
              :key="route.path"
            >
              <Suspense>
                <template #default v-if="Component">
                  <KeepAlive>
                    <component :is="Component" :key="route.path" />
                  </KeepAlive>
                </template>
                <template #fallback>
                  <ProgressSpinner
                    class="loading-spinner"
                    style="width: 5vw; height: 50px"
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                  />
                </template>
              </Suspense>
            </transition>
          </RouterView>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.loading-spinner {
  position: absolute;
  top: 15vh;
  left: 45vw;
}
</style>
