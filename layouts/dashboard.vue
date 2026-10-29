<template>
  <div class="min-h-screen bg-[#F1F6FB]">
    <AppTopbar />
    <div class="mx-auto max-w-[1440px] px-4 md:px-6 py-6 flex flex-col lg:flex-row gap-6">
      <AppSidebar />
      <main class="flex-1 min-w-0"><slot /></main>
    </div>
  </div>
</template>
