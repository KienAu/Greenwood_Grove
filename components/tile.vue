<template>
    <div class="tile">
        <div class="tile__icon-wrapper">
            <img class="tile__icon" :src="icon" alt="" />
        </div>
        <div class="tile__seperator">
            <span></span>
        </div>
        <p class="tile__description">
            {{ description }}
        </p>
    </div>
</template>

<script>
 defineProps({
    icon,
    description
})
</script>