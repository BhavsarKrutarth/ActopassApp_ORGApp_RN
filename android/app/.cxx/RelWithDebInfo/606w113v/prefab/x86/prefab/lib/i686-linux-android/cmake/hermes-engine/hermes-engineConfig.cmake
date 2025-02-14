if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/linux/.gradle/caches/8.11/transforms/12e6a4392b267cf6499f49181975571e/transformed/hermes-android-0.76.5-release/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/linux/.gradle/caches/8.11/transforms/12e6a4392b267cf6499f49181975571e/transformed/hermes-android-0.76.5-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

