import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import { type MenuData } from '@/services/menu'

function findParentKeys(
  tree: MenuData[],
  targetKey: string,
  parentKeys: string[] = []
): string[] | null {
  for (const node of tree) {
    if (node.key === targetKey) {
      return [...parentKeys, node.key]
    }

    if (node.children) {
      const result = findParentKeys(node.children, targetKey, [...parentKeys, node.key])
      if (result) {
        return result
      }
    }
  }

  return null
}

export const useMenuStore = defineStore('menu', () => {
  const menuList: Ref<MenuData[]> = ref([])
  const currItem: Ref<MenuData | null> = ref(
    JSON.parse(localStorage.getItem('menu-selected')!) || null
  )

  const dropdownList = computed(() => {
    const temp: MenuData[] = []
    const dfs = (node: MenuData) => {
      temp.push(node)
      if (node.children) {
        node.children.forEach((child) => dfs(child))
      }
    }
    menuList.value.forEach((item) => dfs(item))
    return temp
  })
  const highlightList = computed(() => {
    return findParentKeys(menuList.value, currItem.value?.key || '') || []
  })

  function setMenuList(data: MenuData[]) {
    menuList.value = data
  }
  function setCurrItem(data: MenuData) {
    currItem.value = data
    localStorage.setItem('menu-selected', JSON.stringify(data))
  }

  return { menuList, currItem, dropdownList, highlightList, setMenuList, setCurrItem }
})
