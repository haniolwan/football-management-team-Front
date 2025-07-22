// export const Filters = ()=>{
//     return(

//             {/* Search and Filters */}
//             <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
//               <div className="flex flex-col sm:flex-row gap-4 mb-4">
//                 {/* Search Bar */}
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search players or teams..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Filter Toggle and Items Per Page */}
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setShowFilters(!showFilters)}
//                     className={`flex items-center gap-2 px-4 py-2 border rounded-lg font-medium transition-all ${
//                       showFilters || activeFiltersCount > 0
//                         ? 'bg-green-50 border-green-300 text-green-700 dark:bg-green-900 dark:border-green-600 dark:text-green-300'
//                         : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
//                     }`}
//                   >
//                     <Filter className="w-4 h-4" />
//                     Filters
//                     {activeFiltersCount > 0 && (
//                       <span className="ml-1 bg-green-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                         {activeFiltersCount}
//                       </span>
//                     )}
//                   </button>

//                   <select
//                     value={itemsPerPage}
//                     onChange={(e) => setItemsPerPage(Number(e.target.value))}
//                     className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   >
//                     <option value={5}>5 per page</option>
//                     <option value={10}>10 per page</option>
//                     <option value={25}>25 per page</option>
//                     <option value={50}>50 per page</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Expanded Filters */}
//               {showFilters && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//                   {/* Position Filter */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Position
//                     </label>
//                     <select
//                       value={positionFilter}
//                       onChange={(e) => setPositionFilter(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     >
//                       <option value="">All Positions</option>
//                       {uniquePositions.map(position => (
//                         <option key={position} value={position}>{position}</option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Status Filter */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Status
//                     </label>
//                     <select
//                       value={statusFilter}
//                       onChange={(e) => setStatusFilter(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     >
//                       <option value="">All Status</option>
//                       <option value="listed">Listed</option>
//                       <option value="not-listed">Not Listed</option>
//                     </select>
//                   </div>

//                   {/* Nationality Filter */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Nationality
//                     </label>
//                     <select
//                       value={nationalityFilter}
//                       onChange={(e) => setNationalityFilter(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     >
//                       <option value="">All Countries</option>
//                       {uniqueNationalities.sort().map(nationality => (
//                         <option key={nationality} value={nationality}>{nationality}</option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Rating Range */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Rating Range: {ratingRange[0]} - {ratingRange[1]}
//                     </label>
//                     <div className="space-y-2">
//                       <input
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={ratingRange[0]}
//                         onChange={(e) => setRatingRange([Number(e.target.value), ratingRange[1]])}
//                         className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//                       />
//                       <input
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={ratingRange[1]}
//                         onChange={(e) => setRatingRange([ratingRange[0], Number(e.target.value)])}
//                         className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//                       />
//                     </div>
//                   </div>

//                   {/* Clear Filters */}
//                   {activeFiltersCount > 0 && (
//                     <div className="sm:col-span-2 lg:col-span-4">
//                       <button
//                         onClick={clearFilters}
//                         className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
//                       >
//                         <X className="w-4 h-4" />
//                         Clear All Filters
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//     )
// }
