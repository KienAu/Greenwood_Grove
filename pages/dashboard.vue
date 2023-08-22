<template>
    <NuxtLayout name="admin">
        <div class="dashboard">
            {{ user?.email }}
        </div>
    </NuxtLayout>

</template>

<script setup>
    import { navigateTo, useFetch } from 'nuxt/app'
    const user = useSupabaseUser()


    definePageMeta({
        layout: false,
        middleware: ['auth']
    })

    onMounted(() => {
        watchEffect(() => {
            if (!user.value) {
                navigateTo('/login')
            }
        })
    })

</script>