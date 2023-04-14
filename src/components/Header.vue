<template>
  <div class="header">
    <RouterLink to="/" class="heading">
      <div class="navbar-brand logo" />
    </RouterLink>

    <div class="right_side">
      <ul class="nav nav-tabs flex-row align-items-end">
        <li class="nav-item">
          <a :class="getActiveClass('store')">
            <RouterLink to="/">
              <font-awesome-icon class="icon_color" icon="store" size="xl" />
            </RouterLink>
          </a>
        </li>

        <li v-if="isAuthenticated" class="nav-item">
          <a :class="getActiveClass('profile')">
            <RouterLink to="/profile">
              <font-awesome-icon class="icon_color" icon="user" size="xl" />
            </RouterLink>
          </a>
        </li>
      </ul>

      <div>
        <button
          v-if="!isAuthenticated && !isLoading"
          id="qsLoginBtn"
          class="btn btn-margin"
          @click.prevent="login"
        >
          <font-awesome-icon class="icon_color" icon="right-to-bracket" size="xl" />
        </button>

        <button
          v-if="isAuthenticated"
          id="qsLoginBtn"
          class="btn btn-margin"
          @click.prevent="logout"
        >
          <font-awesome-icon class="icon_color" icon="right-from-bracket" size="xl" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import { ref } from 'vue';

const route = useRoute();
const auth0 = useAuth0();

const isAuthenticated = ref(auth0.isAuthenticated);
const isLoading = ref(auth0.isLoading);

const getActiveClass = (routeName: string) => {
  return `nav-link ${routeName === route.name ? 'active' : ''}`;
};
const login = () => {
  auth0.loginWithRedirect();
};
const logout = () => {
  auth0.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  });
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.heading {
  text-decoration: none;
  color: Black;
}
.heading:hover {
  background-color: rgba(235, 235, 235, 0.64);
}

.icon_color {
  color: hsla(160, 100%, 37%, 1);
}

.right_side {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}
</style>
