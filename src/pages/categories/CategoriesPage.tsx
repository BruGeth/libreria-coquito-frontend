import { useState, useEffect } from 'react';
import type { Category, CreateCategoryDTO, UpdateCategoryDTO } from '../../types/category';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../api/categoryApi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Table from '../../components/common/Table';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    active: true,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  const fetchCategories = async () => {
    console.log('🔄 Iniciando llamada a la API de categorías...', {
      page: currentPage,
      size: pageSize,
    });
    
    setLoading(true);
    setError(null);
    try {
      const response = await getCategories(currentPage, pageSize);
      
      console.log('✅ Respuesta exitosa de la API:', response);
      
      // Manejar respuesta: puede ser array directo o objeto paginado
      if (Array.isArray(response)) {
        // La API devuelve un array directo sin paginación
        console.log('📊 Formato: Array directo (sin paginación)');
        console.log('📊 Categorías recibidas:', response);
        setCategories(response);
        setTotalPages(1); // Solo una página si es array directo
      } else {
        // La API devuelve objeto paginado
        console.log('📊 Formato: Objeto paginado');
        console.log('📊 Categorías recibidas:', response.content);
        console.log('📄 Total de páginas:', response.totalPages);
        setCategories(response.content || []);
        setTotalPages(response.totalPages || 1);
      }
    } catch (err: any) {
      console.error('❌ Error al cargar categorías:', {
        message: err.message,
        status: err.status,
        details: err.details,
        error: err,
      });
      
      setError(err.message || 'Error al cargar las categorías');
    } finally {
      setLoading(false);
      console.log('🏁 Finalizada la llamada a la API');
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      active: true,
    });
    setFormErrors({});
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    try {
      const categoryData: CreateCategoryDTO = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        active: formData.active,
      };
      
      await createCategory(categoryData);
      setIsCreateModalOpen(false);
      resetForm();
      fetchCategories();
    } catch (err: any) {
      setError(err.message || 'Error al crear la categoría');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      active: category.active,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !validateForm()) return;
    
    setSubmitting(true);
    try {
      const categoryData: UpdateCategoryDTO = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        active: formData.active,
      };
      
      await updateCategory(selectedCategory.id, categoryData);
      setIsEditModalOpen(false);
      resetForm();
      setSelectedCategory(null);
      fetchCategories();
    } catch (err: any) {
      setError(err.message || 'Error al actualizar la categoría');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    
    setSubmitting(true);
    try {
      await deleteCategory(selectedCategory.id);
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
      fetchCategories();
    } catch (err: any) {
      setError(err.message || 'Error al eliminar la categoría');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'id',
      label: 'ID',
      width: '80px',
    },
    {
      key: 'name',
      label: 'Nombre',
    },
    {
      key: 'description',
      label: 'Descripción',
      render: (category: Category) => category.description || '-',
    },
    {
      key: 'active',
      label: 'Estado',
      width: '120px',
      render: (category: Category) => (
        <span className={`status-badge ${category.active ? 'status-active' : 'status-inactive'}`}>
          {category.active ? 'Activo' : 'Inactivo'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Acciones',
      width: '200px',
      render: (category: Category) => (
        <div className="actions-cell">
          <Button
            size="small"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(category);
            }}
          >
            Editar
          </Button>
          <Button
            size="small"
            variant="danger"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(category);
            }}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="categories-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Categorías</h1>
          <p className="page-subtitle">Gestiona las categorías de productos</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          + Nueva Categoría
        </Button>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando categorías...</p>
        </div>
      ) : (
        <>
          <Table columns={columns} data={categories} />
          
          {totalPages > 1 && (
            <div className="pagination">
              <Button
                size="small"
                variant="secondary"
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </Button>
              <span className="pagination-info">
                Página {currentPage + 1} de {totalPages}
              </span>
              <Button
                size="small"
                variant="secondary"
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Siguiente
              </Button>
            </div>
          )}
        </>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetForm();
        }}
        title="Nueva Categoría"
      >
        <form onSubmit={handleCreate} className="category-form">
          <Input
            id="name"
            label="Nombre"
            required
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
            disabled={submitting}
          />
          
          <div className="input-wrapper input-wrapper-full-width">
            <label className="input-label" htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              className="input"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={submitting}
            />
          </div>
          
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              disabled={submitting}
            />
            <label htmlFor="active">Categoría activa</label>
          </div>
          
          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsCreateModalOpen(false);
                resetForm();
              }}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Creando...' : 'Crear Categoría'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetForm();
          setSelectedCategory(null);
        }}
        title="Editar Categoría"
      >
        <form onSubmit={handleUpdate} className="category-form">
          <Input
            id="edit-name"
            label="Nombre"
            required
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
            disabled={submitting}
          />
          
          <div className="input-wrapper input-wrapper-full-width">
            <label className="input-label" htmlFor="edit-description">
              Descripción
            </label>
            <textarea
              id="edit-description"
              className="input"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={submitting}
            />
          </div>
          
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="edit-active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              disabled={submitting}
            />
            <label htmlFor="edit-active">Categoría activa</label>
          </div>
          
          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsEditModalOpen(false);
                resetForm();
                setSelectedCategory(null);
              }}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCategory(null);
        }}
        title="Confirmar Eliminación"
        size="small"
      >
        <div className="delete-confirmation">
          <p>
            ¿Estás seguro de que deseas eliminar la categoría{' '}
            <strong>{selectedCategory?.name}</strong>?
          </p>
          <p className="delete-warning">
            Esta acción no se puede deshacer.
          </p>
          
          <div className="form-actions">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedCategory(null);
              }}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={submitting}
            >
              {submitting ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
