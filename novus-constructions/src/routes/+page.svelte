<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Placeholder from '$lib/components/Placeholder.svelte';
	import Drawer, { Content } from '@smui/drawer';
	import List, { Item, Text } from '@smui/list';
	import IconButton from '@smui/icon-button';

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

	let formStatus: { success: boolean; message: string } | null = null;

	async function handleSubmit(event: Event) {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				body: formData
			});

			const result = await response.json();

			if (response.ok) {
				formStatus = { success: true, message: 'Το μήνυμα στάλθηκε επιτυχώς!' };
				form.reset();
			} else {
				formStatus = {
					success: false,
					message: result.error || 'Παρουσιάστηκε σφάλμα κατά την αποστολή του μηνύματος.'
				};
			}
		} catch (error) {
			formStatus = {
				success: false,
				message: 'Παρουσιάστηκε σφάλμα κατά την αποστολή του μηνύματος.'
			};
		}
	}

	let drawerOpen = false;
	let isMobile = false;

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	});

	function toggleDrawer() {
		drawerOpen = !drawerOpen;
	}

	let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<nav class="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
	<div class="container mx-auto px-4">
		<div class="flex justify-between items-center py-4">
			<div class="text-2xl font-heading font-bold text-primary tracking-wide">
				Novus Constructions
			</div>
			<div class="md:hidden">
				<button on:click={toggleMobileMenu} class="text-primary">
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16m-7 6h7"
						></path>
					</svg>
				</button>
			</div>
			<ul class="hidden md:flex space-x-6">
				{#each sections as section}
					<li>
						<button
							class="text-secondary hover:text-primary capitalize transition-colors duration-200 tracking-wide {currentSection ===
							section
								? 'font-medium border-b-2 border-accent'
								: ''}"
							on:click={() => scrollToSection(section)}
						>
							{section === 'home'
								? 'Αρχική'
								: section === 'services'
									? 'Υπηρεσίες'
									: section === 'projects'
										? 'Έργα'
										: section === 'about'
											? 'Σχετικά'
											: 'Επικοινωνία'}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>

{#if mobileMenuOpen}
	<div class="fixed inset-0 bg-black bg-opacity-50 z-40" on:click={closeMobileMenu}></div>
	<div
		class="fixed top-0 right-0 bottom-0 w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out {mobileMenuOpen
			? 'translate-x-0'
			: 'translate-x-full'}"
	>
		<div class="p-4">
			<button on:click={closeMobileMenu} class="absolute top-4 right-4 text-primary">
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					></path>
				</svg>
			</button>
			<ul class="mt-8 space-y-4">
				{#each sections as section}
					<li>
						<button
							class="text-secondary hover:text-primary capitalize transition-colors duration-200 tracking-wide w-full text-left py-2 {currentSection ===
							section
								? 'font-medium text-primary'
								: ''}"
							on:click={() => {
								scrollToSection(section);
								closeMobileMenu();
							}}
						>
							{section === 'home'
								? 'Αρχική'
								: section === 'services'
									? 'Υπηρεσίες'
									: section === 'projects'
										? 'Έργα'
										: section === 'about'
											? 'Σχετικά'
											: 'Επικοινωνία'}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<main class="pt-16 bg-background">
	{#each sections as section}
		<section
			id={section}
			class="min-h-screen flex items-center justify-center py-16"
			in:fly={{ y: 50, duration: 500 }}
		>
			<div class="container mx-auto px-4">
				<h2
					class="text-4xl font-heading font-bold mb-12 text-center text-primary capitalize tracking-wide"
				>
					{section === 'home'
						? ' '
						: section === 'services'
							? 'Υπηρεσίες'
							: section === 'projects'
								? 'Έργα'
								: section === 'about'
									? 'Σχετικά'
									: 'Επικοινωνία'}
				</h2>
				{#if section === 'home'}
					<div class="text-center max-w-3xl mx-auto">
						<h1
							class="text-6xl font-heading font-bold mb-6 text-primary leading-tight tracking-wide"
						>
							Καλώς ήρθατε στους Novus Constructions
						</h1>
						<p class="text-xl mb-10 text-secondary leading-relaxed">
							Χτίζουμε το μέλλον, ένα έργο τη φορά
						</p>
						<button
							class="bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105"
							on:click={() => scrollToSection('contact')}
						>
							Επικοινωνήστε μαζί μας
						</button>
					</div>
				{:else if section === 'services'}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
						{#each ['Οικιστικές Κατασκευές', 'Εμπορικά Κτίρια', 'Ανακαινίσεις'] as service}
							<div
								class="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
							>
								<h3 class="text-2xl font-heading font-medium mb-4 text-primary tracking-wide">
									{service}
								</h3>
								<p class="text-secondary leading-relaxed">
									Το Lorem Ipsum είναι απλά ένα κείμενο χωρίς νόημα για τους επαγγελματίες της
									τυπογραφίας και στοιχειοθεσίας. Το Lorem Ipsum είναι το επαγγελματικό πρότυπο όσον
									αφορά το κείμενο χωρίς νόημα.
								</p>
							</div>
						{/each}
					</div>
				{:else if section === 'projects'}
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each [1, 2, 3, 4, 5, 6] as project}
							<div
								class="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-200"
							>
								<div class="relative aspect-w-4 aspect-h-3">
									<img
										src="https://via.placeholder.com/400x300"
										alt="Έργο {project}"
										class="w-full h-full object-cover object-center"
									/>
									<div
										class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
									>
										<button
											class="bg-accent hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105"
										>
											Δείτε περισσότερα
										</button>
									</div>
								</div>
								<div class="p-4">
									<h3 class="text-lg font-heading font-semibold mb-2 text-primary">
										Έργο {project}
									</h3>
									<p class="text-sm text-secondary">
										Σύντομη περιγραφή του έργου και των κύριων σημείων του.
									</p>
								</div>
							</div>
						{/each}
					</div>
				{:else if section === 'about'}
					<div class="max-w-4xl mx-auto text-center">
						<p class="text-xl mb-12 text-secondary leading-relaxed">
							Οι Novus Constructions είναι μια κορυφαία κατασκευαστική εταιρεία με πάνω από 20
							χρόνια εμπειρίας στην παράδοση έργων υψηλής ποιότητας. Η ομάδα των έμπειρων
							επαγγελματιών μας είναι αφοσιωμένη στην αριστεία και την καινοτομία σε κάθε πτυχή της
							δουλειάς μας.
						</p>
						<div class="flex flex-wrap justify-center gap-12">
							<div class="bg-white p-8 rounded-lg shadow-lg w-64">
								<h3 class="text-4xl font-heading font-bold mb-2 text-accent">500+</h3>
								<p class="text-secondary">Ολοκληρωμένα Έργα</p>
							</div>
							<div class="bg-white p-8 rounded-lg shadow-lg w-64">
								<h3 class="text-4xl font-heading font-bold mb-2 text-accent">50+</h3>
								<p class="text-secondary">Έμπειρα Μέλη Ομάδας</p>
							</div>
							<div class="bg-white p-8 rounded-lg shadow-lg w-64">
								<h3 class="text-4xl font-heading font-bold mb-2 text-accent">20+</h3>
								<p class="text-secondary">Χρόνια Εμπειρίας</p>
							</div>
						</div>
					</div>
				{:else if section === 'contact'}
					<div class="max-w-md mx-auto bg-white p-10 rounded-lg shadow-lg">
						<form on:submit|preventDefault={handleSubmit} class="space-y-6">
							<div>
								<label for="name" class="block text-secondary font-semibold mb-2">Όνομα</label>
								<input
									type="text"
									id="name"
									name="name"
									class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
									required
								/>
							</div>
							<div>
								<label for="email" class="block text-secondary font-semibold mb-2">Email</label>
								<input
									type="email"
									id="email"
									name="email"
									class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
									required
								/>
							</div>
							<div>
								<label for="message" class="block text-secondary font-semibold mb-2">Μήνυμα</label>
								<textarea
									id="message"
									name="message"
									rows="4"
									class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
									required
								></textarea>
							</div>
							<button
								type="submit"
								class="w-full bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
							>
								Αποστολή Μηνύματος
							</button>
						</form>
						{#if formStatus}
							<p class="mt-6 text-center {formStatus.success ? 'text-green-600' : 'text-red-600'}">
								{formStatus.message}
							</p>
						{/if}
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

	:global(body) {
		@apply font-sans text-secondary bg-background leading-normal;
	}

	/* Add these styles to your existing styles */
	:global(.mdc-drawer) {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: auto;
		z-index: 60;
	}

	:global(.mdc-drawer__content) {
		width: 200px;
	}
</style>
