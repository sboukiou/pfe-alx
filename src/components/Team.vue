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
                    <img :src="member.image" class="card-img-top rounded-circle p-3 mx-auto" alt="Team Member">
                    <div class="card-body">
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
        image: "https://via.placeholder.com/300",
        linkedin: "https://linkedin.com/in/yassineboussif",
        github: "https://github.com/yassineedev",
      },
      {
        name: "Said Boukioud",
        role: "backend software engineer student",
        image: "https://via.placeholder.com/300",
        linkedin: "https://linkedin.com/in/saidboukioud",
        github: "https://github.com/saidboukioud",
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