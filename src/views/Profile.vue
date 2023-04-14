<template>
  <div class="container">
    <div class="row align-items-center profile-header">
      <div class="col-md-2 mb-3">
        <img
          :src="user?.picture"
          alt="User's profile picture"
          class="rounded-circle img-fluid profile-picture"
        />
      </div>
      <div class="col-md text-center text-md-left">
        <h2>{{ user?.name }}</h2>
        <p class="lead text-muted">{{ user.email }}</p>
      </div>
    </div>

    <div class="content">
      <input type="file" accept="video/*" @change="handleFileUpload($event)" class="form-control" />

      <video v-show="file" id="video-preview" controls />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth0, User } from '@auth0/auth0-vue';
import { ref } from 'vue';
const auth0 = useAuth0();
const user = ref<User>(auth0.user);

const file = ref();

const handleFileUpload = (event: any) => {
  file.value = event.target.files[0];

  if (file.value) {
    previewVideo();
  }
};

const previewVideo = () => {
  let video = document.getElementById('video-preview');
  let reader = new FileReader();

  reader.readAsDataURL(file.value);
  reader.addEventListener('load', () => {
    video!.src = reader.result;
  });
};
</script>
