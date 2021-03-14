using System.Collections.Generic;

namespace product {
    public interface IItemRepository {
        Item GetItem(long id);
        IEnumerable<Item> GetAll();
        void Save(Item item);
        void Delete(long id);
    }
}