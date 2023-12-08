<template>
    <div class="calendar">
        <div class="calendar__container">
            <div class="calendar__top">
                <div class="calendar__prev" @click="previousMonth()">
                    <MacroArrowLeftWhite />
                </div>
                <div class="calendar__title"> <span class="calendar__title--month"></span> <span class="calendar__title--year"></span></div>
                <div class="calendar__next" @click="nextMonth()">
                    <MacroArrowRightWhite />
                </div>
            </div>
            <div class="calendar__day-name--container">
                <div class="calendar__day-name" v-for="day in days" :key="day">
                    {{ day }}
                </div>
            </div>
            <div class="calendar__day--container">
                <div class="calendar__day" v-for="index in 42" :key="index" @click="highlightDay(index - 0)">
                    <span class="calendar__day-number"></span>
                    <span class="calendar__day-event"></span>
                </div>
            </div>
        </div>
        <div class="calendar__legend">
            <h6> {{ $t('Legend:') }} </h6>
            <div class="calendar__legend--container">
                <span class="calendar__legend--type">
                    <span class="calendar__legend--color"></span>
                </span>
            </div>
        </div>
        <div class="calendar__highlight">
            <div class="calendar__selected-date--wrapper">
                <span class="calendar__selected-date"></span>
            </div>
            <ul class="calendar__highlight--event-list">
                <li class="calendar__highlight--event-item" >
                </li>
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
        const daysElement = document.querySelectorAll('.calendar__day')
        const monthEl = document.querySelector('.calendar__title--month')
        const yearEl = document.querySelector('.calendar__title--year')
        const theFirstDayOfWeek = theFirst.getDay()
        const monthName = months.value[month]
        monthEl.innerHTML = `${monthName}`
        yearEl.innerHTML = `${year}`
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
                dayNumber.classList.remove('is-empty')
            } else {
                dayNumber.innerText = ''
                dayNumber.classList.add('is-empty')
            }
        }
    }

    const dateDisplaySelected = () => {
        const selectedDate = document.querySelector('.calendar__selected-date')
        let day = new Date().getDate()
        let monthNum = new Date().getMonth()
        let year = new Date().getFullYear()
        let month = months.value[monthNum]
        let formatDay;
        switch (day) {
            case '1':
                formatDay = 'st'
                break
            case '2':
                formatDay = 'nd'
                break
            default:
                formatDay = 'th'
        }


        selectedDate.innerText = `${month} ${day + formatDay}, ${year}`
    }

    const highlightDay = (e) => {
        const daysElement = document.querySelectorAll('.calendar__day')
        const selectedDate = document.querySelector('.calendar__selected-date')
        const selectedMonth = document.querySelector('.calendar__title--month').innerText
        const selectedYear = document.querySelector('.calendar__title--year').innerText
        daysElement.forEach((day) => {
            day.classList.remove('is-selected')
        })
        const index = e - 1
        const day = daysElement[index]
        let selectedDay = day.innerText
        const dayNumber = day.querySelector('.calendar__day-number')
        let formatDay;

        switch (selectedDay) {
            case '1':
                formatDay = 'st'
                break
            case '2':
                formatDay = 'nd'
                break
            default:
                formatDay = 'th'
        }

        if (dayNumber.innerText != '') {
            day.classList.add('is-selected')
            selectedDate.innerText = `${selectedMonth} ${selectedDay + formatDay}, ${selectedYear}`
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

        dateDisplaySelected()
        setTimeout(() => {
            updateCalendar(currentMonth, currentYear, {})
            loadEvents()
        }, 0)
    })
</script>