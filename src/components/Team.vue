<template>
             <!-- team -->
             <section class="py-5 bg-light">
            <div class="container">
              <div class="text-center mb-5">
                <h2 class="fw-bold ">Work Team</h2>
              </div>
              <div class="row g-4 justify-content-center">
                <!-- Team Member 1 -->
                <div class="col-md-5" v-for="(member,index) in teamMembers">
                  <div class="feature-card border-0 shadow-sm text-center">
                    <img :src="member.image" class="img-fluid mb-3" alt="Profile Picture" style="width: 100px; height: 100px;"/>                    <div class="card-body">
                      <h5 class="card-title fw-bold">{{member.name}}</h5>
                      <p class="text-muted">{{member.role}}</p>
                      <div class="d-flex justify-content-center">
                            <!-- LinkedIn Icon -->
                            <a v-if="member.linkedin" :href="member.linkedin" target="_blank" rel="noopener noreferrer" class="text-primary btn me-2">
                              <i class="fab fa-linkedin fa-3x"></i>
                            </a>
                            <!-- GitHub Icon -->
                            <a v-if="member.github" :href="member.github" target="_blank" rel="noopener noreferrer" class="text-dark btn">
                              <i class="fab fa-github fa-3x"></i>
                            </a>
                        </div>

                      <div>
                        <a href="#" class="text-primary me-2"><i class="bi bi-linkdin"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const teamMembers = ref([
      {
        name: "Yassine Boussif",
        role: "backend software engineer student",
        image: "https://media.licdn.com/dms/image/v2/D4E03AQGmtlLyRtMkMQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723907400142?e=1742428800&v=beta&t=KaQLZmPdILhImC3pIEihMVHOXcccsPb4GwNHsEuttdc",
        linkedin: "https://www.linkedin.com/in/yassine-boussif-6789a1293/",
        github: "https://github.com/yassineedev",
      },
      {
        name: "Said Boukioud",
        role: "backend software engineer student",
        image: "https://media.licdn.com/dms/image/v2/D4E03AQF39Mp33CyvIg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1718275138583?e=1742428800&v=beta&t=HVUxl0pssNdl8GejO2AMcJX3qe3jJBAB1ZwSddlqLfM",
        linkedin: "https://www.linkedin.com/in/bouk-said-283b06283/",
        github: "https://github.com/sboukiou",
      },
    ]);

    return {
      teamMembers,
    };
  },
};
</script>
<style scoped>
i {
  transition: transform 0.3s ease;
}

i:hover {
  transform: scale(1.2);
}
</style>