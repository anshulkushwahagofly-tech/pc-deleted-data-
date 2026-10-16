const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const productGrid = `
        <!-- Products Section -->
        <div class="flex flex-col md:flex-row mt-8">
            <!-- Sidebar / Filters -->
            <div class="w-full md:w-64 flex-shrink-0 mr-8 mb-8 md:mb-0">
                <div class="border border-gray-200 rounded-md p-4">
                    <h3 class="font-bold text-lg mb-4">Sort</h3>
                    <select class="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none mb-6">
                        <option>Relevance</option>
                        <option>New Arrivals</option>
                        <option>Price (High to Low)</option>
                        <option>Price (Low to High)</option>
                        <option>Ratings</option>
                    </select>

                    <h3 class="font-bold text-lg mb-4">Filters</h3>
                    
                    <div class="mb-4">
                        <h4 class="font-semibold mb-2">Category</h4>
                        <div class="space-y-2">
                            <label class="flex items-center text-sm"><input type="checkbox" class="mr-2 accent-pink-500"> Kurtis</label>
                            <label class="flex items-center text-sm"><input type="checkbox" class="mr-2 accent-pink-500"> Sarees</label>
                            <label class="flex items-center text-sm"><input type="checkbox" class="mr-2 accent-pink-500"> Watches</label>
                        </div>
                    </div>

                    <div class="border-t border-gray-200 py-4">
                        <h4 class="font-semibold mb-2">Gender</h4>
                        <div class="space-y-2">
                            <label class="flex items-center text-sm"><input type="checkbox" class="mr-2 accent-pink-500"> Men</label>
                            <label class="flex items-center text-sm"><input type="checkbox" class="mr-2 accent-pink-500"> Women</label>
                            <label class="flex items-center text-sm"><input type="checkbox" class="mr-2 accent-pink-500"> Boys</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Product Grid -->
            <div class="flex-grow grid grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Product Card 1 -->
                <div class="border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white">
                    <div class="relative w-full pt-[120%] bg-gray-100">
                        <img src="https://images.meesho.com/images/products/328229864/g4wnt_512.webp" class="absolute top-0 left-0 w-full h-full object-cover">
                    </div>
                    <div class="p-3">
                        <p class="text-gray-500 text-sm truncate mb-1">Aishani Voguish Sarees</p>
                        <div class="flex items-center mb-1">
                            <span class="text-xl font-bold text-gray-800">₹395</span>
                            <span class="text-sm text-gray-400 line-through ml-2">₹445</span>
                            <span class="text-sm text-green-600 font-semibold ml-2">11% off</span>
                        </div>
                        <div class="bg-gray-100 text-gray-600 text-xs inline-block px-2 py-1 rounded-full mb-2">
                            Free Delivery
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                4.1 <svg class="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </div>
                            <span class="text-xs text-gray-500">14 Reviews</span>
                        </div>
                    </div>
                </div>

                <!-- Product Card 2 -->
                <div class="border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white">
                    <div class="relative w-full pt-[120%] bg-gray-100">
                        <img src="https://images.meesho.com/images/products/123307612/g1yiv_512.webp" class="absolute top-0 left-0 w-full h-full object-cover">
                    </div>
                    <div class="p-3">
                        <p class="text-gray-500 text-sm truncate mb-1">Trendy Men's Watches</p>
                        <div class="flex items-center mb-1">
                            <span class="text-xl font-bold text-gray-800">₹145</span>
                            <span class="text-sm text-gray-400 line-through ml-2">₹195</span>
                            <span class="text-sm text-green-600 font-semibold ml-2">25% off</span>
                        </div>
                        <div class="bg-gray-100 text-gray-600 text-xs inline-block px-2 py-1 rounded-full mb-2">
                            Free Delivery
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                3.8 <svg class="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </div>
                            <span class="text-xs text-gray-500">89 Reviews</span>
                        </div>
                    </div>
                </div>

                <!-- Product Card 3 -->
                <div class="border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white">
                    <div class="relative w-full pt-[120%] bg-gray-100">
                        <img src="https://images.meesho.com/images/products/324888195/43r3l_512.webp" class="absolute top-0 left-0 w-full h-full object-cover">
                    </div>
                    <div class="p-3">
                        <p class="text-gray-500 text-sm truncate mb-1">Elegant Women Kurtis</p>
                        <div class="flex items-center mb-1">
                            <span class="text-xl font-bold text-gray-800">₹290</span>
                            <span class="text-sm text-gray-400 line-through ml-2">₹350</span>
                            <span class="text-sm text-green-600 font-semibold ml-2">17% off</span>
                        </div>
                        <div class="bg-gray-100 text-gray-600 text-xs inline-block px-2 py-1 rounded-full mb-2">
                            Free Delivery
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                4.4 <svg class="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </div>
                            <span class="text-xs text-gray-500">312 Reviews</span>
                        </div>
                    </div>
                </div>

                <!-- Product Card 4 -->
                <div class="border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white">
                    <div class="relative w-full pt-[120%] bg-gray-100">
                        <img src="https://images.meesho.com/images/products/219808386/7j8p9_512.webp" class="absolute top-0 left-0 w-full h-full object-cover">
                    </div>
                    <div class="p-3">
                        <p class="text-gray-500 text-sm truncate mb-1">Casual Men's Shirts</p>
                        <div class="flex items-center mb-1">
                            <span class="text-xl font-bold text-gray-800">₹325</span>
                            <span class="text-sm text-gray-400 line-through ml-2">₹399</span>
                            <span class="text-sm text-green-600 font-semibold ml-2">18% off</span>
                        </div>
                        <div class="bg-gray-100 text-gray-600 text-xs inline-block px-2 py-1 rounded-full mb-2">
                            Free Delivery
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                4.0 <svg class="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </div>
                            <span class="text-xs text-gray-500">54 Reviews</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
`;

html = html.replace('</main>', productGrid + '\n    </main>');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Added product grid');
