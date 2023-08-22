<template>
    <div class="login">
        <form
            class="login__form"
            @submit.prevent="() => (isSignUp ? signUp() : login())"
        >
            <input type="email" v-model="email" placeholder="Enter Email" />
            <input type="password" v-model="password" placeholder="Enter Password" />
            <button type="submit" >
                <span v-if="isSignUp">{{ $t('Sign up') }}</span>
                <span v-else>{{ $t('Log In') }}</span>
            </button>
            <button
            @click="isSignUp = !isSignUp"
            >
                <span v-if="isSignUp">{{ $t('Have an account? Log in instead') }}</span>
                <span v-else> {{ $t('Create a new account') }}</span>
            </button>
        </form>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth']
    })
    
    const email = ref('')
    const password = ref('')
    const isSignUp = ref(false)
    const client = useSupabaseClient()

    const signUp = async () => {
        const { user, error } = await client.auth.signUp({
            email: email.value,
            password: password.value
        })
    }

    const login = async () => {
        const { user, error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })
    }

    const user = useSupabaseUser()
        onMounted(() => {
        watchEffect(() => {
            if (user.value) {
                navigateTo('/dashboard')
            }
        })
    })
</script>