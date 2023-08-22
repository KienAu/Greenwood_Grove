<template>
    <header role="header" class="header">
        <div class="container">
            <div class="header__date">
                <div class="header__day-number">{{ date.getDate() }}</div>
                <div class="header__day"> {{ days[date.getDay()] }}</div>
                <div class="header__month-year">{{ months[date.getMonth()] }} {{ date.getFullYear() }}</div>
            </div>
            <AdminNavigation />
        </div>
    </header>
</template>

<script setup>
    const date = new Date()
    const { t } = useI18n()

    const days = ref([
        t('days.Sunday'),
        t('days.Monday'),
        t('days.Tuesday'),
        t('days.Wednesday'),
        t('days.Thursday'),
        t('days.Friday'),
        t('days.Saturday'),
    ])

    const months = ref([
        t('months.January'),
        t('months.February'),
        t('months.March'),
        t('months.April'),
        t('months.May'),
        t('months.June'),
        t('months.July'),
        t('months.August'),
        t('months.September'),
        t('months.October'),
        t('months.November'),
        t('months.December'),
    ])
</script>