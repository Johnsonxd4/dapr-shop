using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace product.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase {
       
        private readonly ILogger<ProductController> _logger;
        private readonly IItemRepository _itemRepository;
        
        public ProductController(ILogger<ProductController> logger, IItemRepository itemRepository) {
            _logger = logger;
            _itemRepository = itemRepository;
        }

        [HttpGet]
        public IEnumerable<Item> Get() {
            return _itemRepository.GetAll();    
        }
    }
}
