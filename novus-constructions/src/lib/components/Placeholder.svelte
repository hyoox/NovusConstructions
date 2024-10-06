<script lang="ts">
	export let width = 400;
	export let height = 300;
</script>

<div class="placeholder" style="width: {width}px; height: {height}px;">
	<span>{width}x{height}</span>
</div>

<style>
	.placeholder {
		background-color: #cbd5e0;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.placeholder span {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		color: #4a5568;
		font-size: 16px;
		text-align: center;
	}
</style>
