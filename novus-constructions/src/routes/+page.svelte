<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let currentSection = 'home';

	const sections = ['home', 'services', 'projects', 'about', 'contact'];

	function scrollToSection(section: string) {
		const element = document.getElementById(section);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						currentSection = entry.target.id;
					}
				});
			},
			{ threshold: 0.5 }
		);

		sections.forEach((section) => {
			const element = document.getElementById(section);
			if (element) {
				observer.observe(element);
			}
		});

		return () => observer.disconnect();
	});
</script>

<nav class="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
	<div class="container mx-auto px-4">
		<div class="flex justify-between items-center py-4">
			<div class="text-2xl font-bold text-gray-800">Novus Constructors</div>
			<ul class="flex space-x-4">
				{#each sections as section}
					<li>
						<button
							class="text-gray-600 hover:text-gray-800 capitalize {currentSection === section
								? 'font-bold'
								: ''}"
							on:click={() => scrollToSection(section)}
						>
							{section}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>

<main class="pt-16">
	{#each sections as section}
		<section
			id={section}
			class="min-h-screen flex items-center justify-center bg-gray-100"
			in:fly={{ y: 50, duration: 500 }}
		>
			<div class="container mx-auto px-4">
				<h2 class="text-4xl font-bold mb-8 text-center capitalize">{section}</h2>
				{#if section === 'home'}
					<div class="text-center">
						<h1 class="text-6xl font-bold mb-4">Welcome to Novus Constructors</h1>
						<p class="text-xl mb-8">Building the future, one project at a time</p>
						<button
							class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
							on:click={() => scrollToSection('contact')}
						>
							Get in Touch
						</button>
					</div>
				{:else if section === 'services'}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{#each ['Residential Construction', 'Commercial Buildings', 'Renovations'] as service}
							<div class="bg-white p-6 rounded-lg shadow-md">
								<h3 class="text-2xl font-semibold mb-4">{service}</h3>
								<p class="text-gray-600">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua.
								</p>
							</div>
						{/each}
					</div>
				{:else if section === 'projects'}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{#each [1, 2, 3, 4, 5, 6] as project}
							<div class="bg-white rounded-lg shadow-md overflow-hidden">
								<img
									src="/placeholder.svg?height=200&width=300"
									alt="Project {project}"
									class="w-full h-48 object-cover"
								/>
								<div class="p-4">
									<h3 class="text-xl font-semibold mb-2">Project {project}</h3>
									<p class="text-gray-600">Brief description of the project and its highlights.</p>
								</div>
							</div>
						{/each}
					</div>
				{:else if section === 'about'}
					<div class="max-w-3xl mx-auto text-center">
						<p class="text-xl mb-8">
							Novus Constructors is a leading construction company with over 20 years of experience
							in delivering high-quality projects. Our team of skilled professionals is committed to
							excellence and innovation in every aspect of our work.
						</p>
						<div class="flex justify-center space-x-8">
							<div>
								<h3 class="text-4xl font-bold mb-2">500+</h3>
								<p class="text-gray-600">Projects Completed</p>
							</div>
							<div>
								<h3 class="text-4xl font-bold mb-2">50+</h3>
								<p class="text-gray-600">Expert Team Members</p>
							</div>
							<div>
								<h3 class="text-4xl font-bold mb-2">20+</h3>
								<p class="text-gray-600">Years of Experience</p>
							</div>
						</div>
					</div>
				{:else if section === 'contact'}
					<div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
						<form>
							<div class="mb-4">
								<label for="name" class="block text-gray-700 font-bold mb-2">Name</label>
								<input type="text" id="name" class="w-full px-3 py-2 border rounded-lg" required />
							</div>
							<div class="mb-4">
								<label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
								<input
									type="email"
									id="email"
									class="w-full px-3 py-2 border rounded-lg"
									required
								/>
							</div>
							<div class="mb-4">
								<label for="message" class="block text-gray-700 font-bold mb-2">Message</label>
								<textarea id="message" rows="4" class="w-full px-3 py-2 border rounded-lg" required
								></textarea>
							</div>
							<button
								type="submit"
								class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
							>
								Send Message
							</button>
						</form>
					</div>
				{/if}
			</div>
		</section>
	{/each}
</main>

<style lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
