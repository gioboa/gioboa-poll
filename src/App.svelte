<script lang="ts">
	import svelteLogo from './assets/svelte.svg';
	import { store, incrementNo, incrementYes } from './store';

	let showResult = false;

	$: yes = $store.percentage.yes;
	$: no = $store.percentage.no;
</script>

<div class="flex flex-col p-8 w-full bg-gray-100 shadow-md rounded-lg">
	<div class="flex gap-2 justify-center">
		<a href="https://svelte.dev" target="_blank" rel="noreferrer">
			<img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
		</a>
		<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
			<img src="/vite.svg" class="logo" alt="Vite Logo" />
		</a>
	</div>
	<div
		class="text-gray-700 font-bold text-xl text-center p-4"
		style="font-size: 40px; line-height:2.5rem;"
	>
		Did you like the speech?
	</div>
	{#if showResult}
		<div class="flex gap-2">
			<div class="w-full flex flex-col">
				<div class="items-center p-4" style="font-size: 40px">🚀</div>
				<div class="mt-4 flex flex-row items-center">
					<div class="text-gray-700 font-normal text-xl mr-3">
						{yes}%
					</div>
					<div class="w-full bg-gray-200 rounded-full h-5">
						<div
							class="bg-indigo-400 h-5 rounded-full transition-all duration-200"
							style={`width: ${yes}%;`}
						/>
					</div>
				</div>
			</div>
			<div class="w-full flex flex-col">
				<div class="items-center p-4" style="font-size: 40px">👍</div>
				<div class="mt-4 flex flex-row items-center">
					<div class="text-gray-700 font-normal text-xl mr-3">
						{no}%
					</div>
					<div class="w-full bg-gray-200 rounded-full h-5">
						<div
							class="bg-indigo-400 h-5 rounded-full transition-all duration-200"
							style={`width: ${no}%;`}
						/>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="flex gap-2 justify-center">
			<button
				type="button"
				class="inline-block rounded bg-primary m-4 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
				style="width: 100px;font-size: 40px"
				data-te-ripple-init
				data-te-ripple-color="light"
				on:click={() => {
					incrementYes();
					showResult = true;
				}}
			>
				🚀
			</button>
			<button
				type="button"
				class="inline-block rounded bg-primary m-4 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
				style="width: 100px;font-size: 40px"
				data-te-ripple-init
				data-te-ripple-color="light"
				on:click={() => {
					incrementNo();
					showResult = true;
				}}
			>
				👍
			</button>
		</div>
	{/if}
</div>

<style>
	.logo {
		height: 5em;
		margin: 20px;
		will-change: filter;
		transition: filter 300ms;
	}
	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}
	.logo.svelte:hover {
		filter: drop-shadow(0 0 2em #ff3e00aa);
	}
</style>
