<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
	setup() {
		const activeIndex = ref(0)

		const enableClass = (index: number): boolean =>
			[index, index + 12].includes((activeIndex.value % 12) + 12)

		const getClasses = (index: number): Record<string, boolean> => ({
			'far-left': enableClass(index - 5),
			left: enableClass(index - 4),
			center: enableClass(index - 3),
			right: enableClass(index - 2),
			'far-right': enableClass(index - 1),
		})

		return {
			getClasses,
			activeIndex,
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

			<div class="move"></div>
			<div class="center-bg"></div>
			<div class="move"></div>
			<nav id="travel-slider-nav">
				<a @click="activeIndex++">
					<img src="/svg/arrow-down.svg" class="arrow-icon svg" />
					<div></div>
				</a>
				<p id="travel-slider-help"></p>
				<a @click="activeIndex--">
					<img src="/svg/arrow-down.svg" class="arrow-icon svg" />
					<div></div>
				</a>
			</nav>
		</div>
	</section>
</template>
