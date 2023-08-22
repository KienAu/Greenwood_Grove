<template>
    <div class="calendar">
        <div class="calendar__container">
            <div class="calendar__top">
                <div class="calendar__prev" @click="previousMonth()">&lt;</div>
                <div class="calendar__title"></div>
                <div class="calendar__next" @click="nextMonth()">></div>
            </div>
            <div class="calendar__day-name" v-for="day in days" :key="day">
                {{ day }}
            </div>
            <div class="calendar__day" v-for="index in 35" :key="index" @click="highlightDay(index - 0)">
                <span class="calendar__day-number"></span>
                <span class="calendar__day-event"></span>
            </div>
        </div>
        <div class="calendar__selected-day">
            <div class="calendar__selected-day-number"></div>
            <div class="calendar__selected-day-name"></div>
            <div class="calendar__selected-day-month-year"></div>
            <ul class="calendar__selected-day__event-list">
                <li class="calendar__selected-day__event-item" v-for="event in stories">{{ event.content.Title }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    const storyblokApi = useStoryblokApi()
    const { data } = await storyblokApi.get('cdn/stories', {
        version: 'draft',
        starts_with: 'event',
        is_startpage: false,
    })

    let events
    const stories = data.stories

    events = stories.reduce((accumulator, event) => {
        const eventTime = new Date(event.content.Date)
        const eventDate = new Date(eventTime.toDateString())

        accumulator[eventDate] = event.content
        return accumulator
    }, {})

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

    const today = new Date()
    let currentMonth = today.getMonth()
    let currentYear = today.getFullYear()

    const updateCalendar = (month, year, events) => {
        const theFirst = new Date()
        theFirst.setMonth(month)
        theFirst.setYear(year)
        theFirst.setDate(1)

        const highLightNumberDay = document.querySelector('.calendar__selected-day-number')
        const highLightNumberMonthYear = document.querySelector('.calendar__selected-day-month-year')
        const daysElement = document.querySelectorAll('.calendar__day')
        const monthEl = document.querySelector('.calendar__title')

        const theFirstDayOfWeek = theFirst.getDay()
        const monthName = months.value[month]
        const monthWithYear = `${year} - ${monthName}`
        monthEl.innerText = monthWithYear
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        let dayCounter = 1
        for (let i = 0; i < daysElement.length; i++) {
            const day = daysElement[i]
            const dayNumber = day.querySelector('.calendar__day-number')

            if (i >= theFirstDayOfWeek && dayCounter <= daysInMonth) {
                const thisDate = new Date(year, month, dayCounter)

                const eventName = day.querySelector('.calendar__day-event')

                if (events[thisDate]) {
                    const event = events[thisDate]
                    eventName.innerText = `* ${event.Title}`
                } else {
                    eventName.innerText = ''
                }

                dayNumber.innerText = dayCounter
                dayCounter++
            } else {
                dayNumber.innerText = ''
            }
        }

        if (months.value[currentMonth] === monthName) {
            highLightNumberDay.innerText = new Date().getDate() - 1
        } else {
            highLightNumberDay.innerText = 1
        }
        highLightNumberMonthYear.innerText = `${monthName}, ${year}`
    }

    const highlightDay = (e) => {
        const daysElement = document.querySelectorAll('.calendar__day')
        const index = e - 1
        const day = daysElement[index]
        const dayNumber = day.querySelector('.calendar__day-number')
        const highLightNumberDay = document.querySelector('.calendar__selected-day-number')
        if (dayNumber.innerText != '') {
            highLightNumberDay.innerText = dayNumber.innerText
            
        }
    }

    const previousMonth = () => {
        if (currentMonth === 0) {
            currentMonth = 12
            currentYear--
        }

        updateCalendar(--currentMonth, currentYear, events)
    }

    const nextMonth = () => {
        if (currentMonth === 11) {
            currentMonth = -1
            currentYear++
        }

        updateCalendar(++currentMonth, currentYear, events)
    }

    onMounted(() => {
        const loadEvents = async () => {
            updateCalendar(currentMonth, currentYear, events)
        }
        setTimeout(() => {
            updateCalendar(currentMonth, currentYear, {})
            loadEvents()
        }, 0)
    })
</script>