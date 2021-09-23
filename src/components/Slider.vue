<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
	name: 'Slider',
	setup() {
		const activeIndex = ref(0),
			random = ref(Date.now()),
			lastDirection = ref<0 | -1 | 1>(0)

		const enableClass = (index: number): boolean =>
			[index, index + 12].includes((activeIndex.value % 12) + 12)

		const getClasses = (index: number): Record<string, boolean> => ({
			'far-left': enableClass(index - 5),
			left: enableClass(index - 4),
			center: enableClass(index - 3),
			right: enableClass(index - 2),
			'far-right': enableClass(index - 1),
		})

		const changeSlide = (direction: 1 | -1) => {
			lastDirection.value = direction
			activeIndex.value += direction
			random.value = Date.now()
		}

		return {
			getClasses,
			changeSlide,
			random,
			lastDirection,
		}
	},
})
</script>

<template>
	<section id="travel-slider-containder">
		<div id="travel-slider" default-slide="1">
			<template v-for="i in [0, 1, 2, 3]" :key="i">
				<section :class="getClasses(i * 3)">
					<img src="/img/spain_bridge.jpg" />
					<footer>
						<p>Hiszpania</p>
					</footer>
				</section>
				<section :class="getClasses(i * 3 + 1)">
					<img src="/img/12.jpg" />
					<footer>
						<p>Portugalia</p>
					</footer>
				</section>
				<section :class="getClasses(i * 3 + 2)">
					<img src="/img/spain_poz.jpg" />
					<footer>
						<p>Inne</p>
					</footer>
				</section>
			</template>

			<div class="move" @click="changeSlide(1)"></div>
			<div
				class="center-bg"
				:class="{
					'anim-next': lastDirection === -1,
					'anim-prev': lastDirection === 1,
				}"
				:key="random + '.center-bg'"
			></div>
			<div class="move" @click="changeSlide(-1)"></div>
			<nav id="travel-slider-nav">
				<a @click="changeSlide(1)">
					<img src="/svg/arrow-down.svg" class="arrow-icon svg" />
					<div></div>
				</a>
				<p id="travel-slider-help"></p>
				<a @click="changeSlide(-1)">
					<img src="/svg/arrow-down.svg" class="arrow-icon svg" />
					<div></div>
				</a>
			</nav>
		</div>
	</section>
</template>
